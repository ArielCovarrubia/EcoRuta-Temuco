import { rutas, filtrarRutas, obtenerRutaDelDia } from './rutas.js';

interface EstadoFiltros {
    dificultad: string;
    tipoActividad: string;
}

// Nombres de los parámetros de URL
const PARAM_DIFICULTAD = 'dificultad';
const PARAM_ACTIVIDAD = 'actividad';

document.addEventListener('DOMContentLoaded', () => {
    const formFiltros = document.getElementById('form-filtros-rutas');
    const selectDificultad = document.getElementById('filtro-dificultad') as HTMLSelectElement | null;
    const selectActividad = document.getElementById('filtro-actividad') as HTMLSelectElement | null;
    const btnLimpiar = document.getElementById('btn-limpiar-filtros') as HTMLButtonElement | null;
    const mensajeSinResultados = document.getElementById('mensaje-sin-resultados') as HTMLElement | null;
    const contenedorChips = document.getElementById('filtros-activos') as HTMLElement | null;

    const pageTitle = document.body.getAttribute('data-page-title') || '';
    let comunaActual = '';

    if (pageTitle.includes('Pucón')) comunaActual = 'Pucón';
    else if (pageTitle.includes('Temuco')) comunaActual = 'Temuco';
    else if (pageTitle.includes('Villarrica')) comunaActual = 'Villarrica';

    const rutaDia = obtenerRutaDelDia(rutas, comunaActual);

    if (rutaDia) {
        const destacado = document.querySelector('.destacado');

        if (destacado) {
            const h3 = destacado.querySelector('h3');
            const p = destacado.querySelector('p');
            const img = destacado.querySelector('img');
            const btn = destacado.querySelector<HTMLAnchorElement>('.carta-btn');

            const numeroRuta = rutaDia.id;
            const idioma = document.documentElement.lang || 'es';
            const prefijo = comunaActual.toLowerCase();

            const nombreTraducido = obtenerTraduccion(
                `${prefijo}.route${numeroRuta}Name`
            );

            const descripcionTraducida = obtenerTraduccion(
                `${prefijo}.route${numeroRuta}Description`
            );

            if (h3) h3.textContent = nombreTraducido || rutaDia.nombre;
            if (p) p.textContent = descripcionTraducida || rutaDia.descripcion;

            if (img) {
                img.src = '../' + rutaDia.imagen;
                img.alt = nombreTraducido || rutaDia.nombre;
            }

            if (btn) {
                if (rutaDia.urlDetalle) {
                    btn.href = rutaDia.urlDetalle;
                    btn.hidden = false;
                } else {
                    btn.hidden = true;
                }
            }
        }
    }

    if (!formFiltros) return;

    // ------------------------------------------------------------------
    // Persistencia de filtros (Dificultad y Actividad)
    // ------------------------------------------------------------------
    const claveAlmacen = `ecoruta.filtros.${comunaActual.toLowerCase()}`;

    // Solo se aceptan valores que existen como <option>, así una URL o un  dato guardado manipulado nunca produce un estado inválido.
    function valorPermitido(select: HTMLSelectElement | null, valor: unknown): string {
        if (!select || typeof valor !== 'string' || valor === '') return '';
        return Array.from(select.options).some(op => op.value === valor) ? valor : '';
    }

    function leerEstadoDesdeUrl(): EstadoFiltros | null {
        const params = new URLSearchParams(window.location.search);
        if (!params.has(PARAM_DIFICULTAD) && !params.has(PARAM_ACTIVIDAD)) return null;

        return {
            dificultad: valorPermitido(selectDificultad, params.get(PARAM_DIFICULTAD)),
            tipoActividad: valorPermitido(selectActividad, params.get(PARAM_ACTIVIDAD))
        };
    }

    function leerEstadoDesdeAlmacen(): EstadoFiltros | null {
        try {
            const crudo = window.sessionStorage.getItem(claveAlmacen);
            if (!crudo) return null;

            const datos = JSON.parse(crudo) as Partial<Record<keyof EstadoFiltros, unknown>>;
            return {
                dificultad: valorPermitido(selectDificultad, datos.dificultad),
                tipoActividad: valorPermitido(selectActividad, datos.tipoActividad)
            };
        } catch {
            // Almacenamiento no disponible o contenido corrupto: se ignora.
            return null;
        }
    }

    function leerEstadoActual(): EstadoFiltros {
        return {
            dificultad: selectDificultad ? selectDificultad.value : '',
            tipoActividad: selectActividad ? selectActividad.value : ''
        };
    }

    function guardarEstado(estado: EstadoFiltros): void {
        // 1) URL (replaceState: no ensucia el historial con cada cambio).
        try {
            const params = new URLSearchParams(window.location.search);

            if (estado.dificultad) params.set(PARAM_DIFICULTAD, estado.dificultad);
            else params.delete(PARAM_DIFICULTAD);

            if (estado.tipoActividad) params.set(PARAM_ACTIVIDAD, estado.tipoActividad);
            else params.delete(PARAM_ACTIVIDAD);

            const consulta = params.toString();
            const nuevaUrl = window.location.pathname + (consulta ? `?${consulta}` : '') + window.location.hash;
            const urlActual = window.location.pathname + window.location.search + window.location.hash;

            if (nuevaUrl !== urlActual) {
                window.history.replaceState(window.history.state, '', nuevaUrl);
            }
        } catch {
            // Algunos contextos (p. ej. file://) no permiten replaceState.
        }

        // 2) Respaldo de sesión.
        try {
            if (estado.dificultad || estado.tipoActividad) {
                window.sessionStorage.setItem(claveAlmacen, JSON.stringify(estado));
            } else {
                window.sessionStorage.removeItem(claveAlmacen);
            }
        } catch {
            // Sin almacenamiento: la URL sigue funcionando.
        }
    }

    // ------------------------------------------------------------------
    // Chips de filtros activos
    // ------------------------------------------------------------------
    interface DefinicionFiltro {
        id: 'dificultad' | 'actividad';
        select: HTMLSelectElement | null;
        etiqueta: HTMLElement | null;
    }

    function renderizarChips(): void {
        if (!contenedorChips) return;

        const filtros: DefinicionFiltro[] = [
            {
                id: 'dificultad',
                select: selectDificultad,
                etiqueta: document.querySelector<HTMLElement>('label[for="filtro-dificultad"]')
            },
            {
                id: 'actividad',
                select: selectActividad,
                etiqueta: document.querySelector<HTMLElement>('label[for="filtro-actividad"]')
            }
        ];

        contenedorChips.replaceChildren();

        const titulo = document.createElement('span');
        titulo.id = 'filtros-activos-titulo';
        titulo.className = 'filtros-activos-titulo';
        titulo.dataset.i18n = 'routes.activeFilters';
        titulo.textContent = obtenerTraduccion('routes.activeFilters') || 'Filtros activos:';
        contenedorChips.appendChild(titulo);

        let totalActivos = 0;

        filtros.forEach(({ id, select, etiqueta }) => {
            if (!select || !select.value) return;

            const opcion = select.selectedOptions[0];
            totalActivos++;

            const chip = document.createElement('span');
            chip.className = 'chip-filtro';

            // Etiqueta y valor reutilizan las claves i18n del propio formulario, así se traducen solos cuando cambia el idioma.
            const spanEtiqueta = document.createElement('span');
            spanEtiqueta.id = `chip-etiqueta-${id}`;
            spanEtiqueta.className = 'chip-etiqueta';
            if (etiqueta?.dataset.i18n) spanEtiqueta.dataset.i18n = etiqueta.dataset.i18n;
            spanEtiqueta.textContent = (etiqueta?.textContent || '').trim();

            const spanValor = document.createElement('span');
            spanValor.id = `chip-valor-${id}`;
            spanValor.className = 'chip-valor';
            if (opcion?.dataset.i18n) spanValor.dataset.i18n = opcion.dataset.i18n;
            spanValor.textContent = (opcion?.textContent || select.value).trim();

            const boton = document.createElement('button');
            boton.type = 'button';
            boton.className = 'chip-quitar';
            boton.dataset.filtro = id;
            boton.setAttribute(
                'aria-labelledby',
                `chip-quitar-texto-${id} chip-etiqueta-${id} chip-valor-${id}`
            );

            const iconoQuitar = document.createElement('span');
            iconoQuitar.setAttribute('aria-hidden', 'true');
            iconoQuitar.textContent = '×';

            const textoQuitar = document.createElement('span');
            textoQuitar.id = `chip-quitar-texto-${id}`;
            textoQuitar.className = 'sr-only';
            textoQuitar.dataset.i18n = 'routes.removeFilter';
            textoQuitar.textContent = obtenerTraduccion('routes.removeFilter') || 'Quitar filtro';

            boton.append(iconoQuitar, textoQuitar);
            chip.append(spanEtiqueta, spanValor, boton);
            contenedorChips.appendChild(chip);
        });

        contenedorChips.hidden = totalActivos === 0;
    }

    function aplicarFiltros() {
        const filtros = {
            comuna: comunaActual,
            dificultad: selectDificultad ? selectDificultad.value : '',
            tipoActividad: selectActividad ? selectActividad.value : ''
        };

        const rutasFiltradas = filtrarRutas(rutas, filtros);

        const idsVisibles = new Set(rutasFiltradas.map(r => r.id));
        const tarjetas = document.querySelectorAll<HTMLElement>('.cartas-img .carta');
        let visiblesContador = 0;

        tarjetas.forEach(tarjeta => {
            const claveNombre = tarjeta.querySelector<HTMLElement>(
                '[data-i18n$="Name"]'
            )?.dataset.i18n;
            const idDesdeClave = claveNombre?.match(/\.route(\d+)Name$/)?.[1];
            const idDesdeDatos = Number(tarjeta.dataset.id);
            const idRuta = idDesdeClave
                ? Number(idDesdeClave)
                : Number.isInteger(idDesdeDatos)
                    ? idDesdeDatos
                    : null;

            // Es preferible utilizar el ID de la ruta en la clave de traducción, ya que este permanece vinculado al
            // conjunto de datos, incluso si el «data-id» falta o es incorrecto por error. 
            // Las tarjetas desconocidas permanecen visibles, de modo que un problema en el marcado nunca oculte el contenido.
            const idExiste = idRuta !== null && rutas.some(ruta => ruta.id === idRuta);
            const esCoincidente = !idExiste || idsVisibles.has(idRuta);

            if (esCoincidente) {
                tarjeta.classList.remove('oculto');
                visiblesContador++;
            } else {
                tarjeta.classList.add('oculto');
            }
        });

        if (mensajeSinResultados) {
            if (visiblesContador === 0) {
                mensajeSinResultados.classList.remove('oculto');
            } else {
                mensajeSinResultados.classList.add('oculto');
            }
        }

        renderizarChips();
        guardarEstado(leerEstadoActual());
    }

    // Prioridad al restaurar: URL > sesión > sin filtros.
    function restaurarEstado(): void {
        const estado = leerEstadoDesdeUrl() ?? leerEstadoDesdeAlmacen() ?? { dificultad: '', tipoActividad: '' };

        if (selectDificultad) selectDificultad.value = estado.dificultad;
        if (selectActividad) selectActividad.value = estado.tipoActividad;

        aplicarFiltros();
    }

    formFiltros.addEventListener('submit', (event) => {
        event.preventDefault();
        aplicarFiltros();
    });

    if (selectDificultad) selectDificultad.addEventListener('change', aplicarFiltros);
    if (selectActividad) selectActividad.addEventListener('change', aplicarFiltros);

    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', (event) => {
            event.preventDefault();
            if (selectDificultad) selectDificultad.value = '';
            if (selectActividad) selectActividad.value = '';
            aplicarFiltros();
        });
    }

    // Quitar un filtro individual desde su chip.
    if (contenedorChips) {
        contenedorChips.addEventListener('click', (event) => {
            const boton = (event.target as HTMLElement).closest<HTMLButtonElement>('.chip-quitar');
            if (!boton) return;

            const select = boton.dataset.filtro === 'dificultad' ? selectDificultad : selectActividad;
            if (!select) return;

            select.value = '';
            aplicarFiltros();
            // El chip desaparece: devolver el foco al control para no perderlo.
            select.focus();
        });
    }

    restaurarEstado();

    // Al volver con "Atrás" el navegador puede restaurar la página desde su caché o rellenar los campos por su cuenta; se vuelve a sincronizar.
    window.addEventListener('pageshow', restaurarEstado);
});
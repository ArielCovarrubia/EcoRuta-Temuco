import { rutas, filtrarRutas, obtenerRutaDelDia } from './rutas.js';
document.addEventListener('DOMContentLoaded', () => {
    const formFiltros = document.getElementById('form-filtros-rutas');
    const selectDificultad = document.getElementById('filtro-dificultad');
    const selectActividad = document.getElementById('filtro-actividad');
    const btnLimpiar = document.getElementById('btn-limpiar-filtros');
    const mensajeSinResultados = document.getElementById('mensaje-sin-resultados');
    const pageTitle = document.body.getAttribute('data-page-title') || '';
    let comunaActual = '';
    if (pageTitle.includes('Pucón'))
        comunaActual = 'Pucón';
    else if (pageTitle.includes('Temuco'))
        comunaActual = 'Temuco';
    else if (pageTitle.includes('Villarrica'))
        comunaActual = 'Villarrica';
    const rutaDia = obtenerRutaDelDia(rutas, comunaActual);
    if (rutaDia) {
        const destacado = document.querySelector('.destacado');
        if (destacado) {
            const h3 = destacado.querySelector('h3');
            const p = destacado.querySelector('p');
            const img = destacado.querySelector('img');
            const btn = destacado.querySelector('.carta-btn');
            const numeroRuta = rutaDia.id;
            const idioma = document.documentElement.lang || 'es';
            const prefijo = comunaActual.toLowerCase();
            const nombreTraducido = obtenerTraduccion(`${prefijo}.route${numeroRuta}Name`);
            const descripcionTraducida = obtenerTraduccion(`${prefijo}.route${numeroRuta}Description`);
            if (h3)
                h3.textContent = nombreTraducido || rutaDia.nombre;
            if (p)
                p.textContent = descripcionTraducida || rutaDia.descripcion;
            if (img) {
                img.src = '../' + rutaDia.imagen;
                img.alt = nombreTraducido || rutaDia.nombre;
            }
            if (btn) {
                if (rutaDia.urlDetalle) {
                    btn.href = rutaDia.urlDetalle;
                    btn.hidden = false;
                }
                else {
                    btn.hidden = true;
                }
            }
        }
    }
    if (!formFiltros)
        return;
    function aplicarFiltros() {
        const filtros = {
            comuna: comunaActual,
            dificultad: selectDificultad ? selectDificultad.value : '',
            tipoActividad: selectActividad ? selectActividad.value : ''
        };
        const rutasFiltradas = filtrarRutas(rutas, filtros);
        const idsVisibles = new Set(rutasFiltradas.map(r => r.id));
        const tarjetas = document.querySelectorAll('.cartas-img .carta');
        let visiblesContador = 0;
        tarjetas.forEach(tarjeta => {
            const claveNombre = tarjeta.querySelector('[data-i18n$="Name"]')?.dataset.i18n;
            const idDesdeClave = claveNombre?.match(/\.route(\d+)Name$/)?.[1];
            const idDesdeDatos = Number(tarjeta.dataset.id);
            const idRuta = idDesdeClave
                ? Number(idDesdeClave)
                : Number.isInteger(idDesdeDatos)
                    ? idDesdeDatos
                    : null;
            // Prefer the route ID in the translation key, which remains tied to
            // the dataset even if data-id is missing or accidentally incorrect.
            // Unknown cards stay visible so a markup issue never hides content.
            const idExiste = idRuta !== null && rutas.some(ruta => ruta.id === idRuta);
            const esCoincidente = !idExiste || idsVisibles.has(idRuta);
            if (esCoincidente) {
                tarjeta.classList.remove('oculto');
                visiblesContador++;
            }
            else {
                tarjeta.classList.add('oculto');
            }
        });
        if (mensajeSinResultados) {
            if (visiblesContador === 0) {
                mensajeSinResultados.classList.remove('oculto');
            }
            else {
                mensajeSinResultados.classList.add('oculto');
            }
        }
    }
    formFiltros.addEventListener('submit', (event) => {
        event.preventDefault();
        aplicarFiltros();
    });
    if (selectDificultad)
        selectDificultad.addEventListener('change', aplicarFiltros);
    if (selectActividad)
        selectActividad.addEventListener('change', aplicarFiltros);
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', (event) => {
            event.preventDefault();
            if (selectDificultad)
                selectDificultad.value = '';
            if (selectActividad)
                selectActividad.value = '';
            aplicarFiltros();
        });
    }
});

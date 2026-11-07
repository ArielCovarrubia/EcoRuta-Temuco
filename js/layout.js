"use strict";
const currentPath = window.location.pathname;
const isInsidePages = currentPath.includes('/paginas/');
const isInsideTests = currentPath.includes('/tests') || currentPath.includes('/pruebas');
const isInsideExtraPages = currentPath.includes('/paginas extra/') ||
    currentPath.includes('/paginas%20extra/');
const basePath = isInsideExtraPages
    ? '../components/'
    : isInsideTests
        ? '../paginas/components/'
        : isInsidePages
            ? 'components/'
            : 'paginas/components/';
// Ruta del archivo de traducciones.
const idiomasPath = isInsideExtraPages
    ? '../../data/idiomas.json'
    : isInsidePages
        ? '../data/idiomas.json'
        : 'data/idiomas.json';
// Variables para las traducciones.
let traducciones = {};
let idiomaActual = 'es';
const promesaTraducciones = cargarTraducciones();
// Carga las traducciones desde idiomas.json.
async function cargarTraducciones() {
    try {
        const respuesta = await fetch(idiomasPath);
        if (!respuesta.ok) {
            throw new Error('No se pudo cargar el archivo de idiomas.');
        }
        traducciones = await respuesta.json();
        return true;
    }
    catch (error) {
        console.error('Error al cargar las traducciones:', error);
        return false;
    }
}
// Busca una traducción mediante una clave.
function obtenerTraduccion(clave) {
    let valor = traducciones[idiomaActual];
    for (const parte of clave.split('.')) {
        if (typeof valor !== 'object' || valor === null)
            return undefined;
        valor = valor[parte];
    }
    return typeof valor === 'string' ? valor : undefined;
}
// Aplica el idioma seleccionado.
function aplicarIdioma(idioma) {
    if (!traducciones[idioma]) {
        idioma = 'es';
    }
    idiomaActual = idioma;
    document.documentElement.lang = idioma;
    document.querySelectorAll('[data-i18n]').forEach(elemento => {
        const clave = elemento.dataset.i18n;
        if (!clave)
            return;
        const texto = obtenerTraduccion(clave);
        if (texto === undefined) {
            console.warn(`No se encontró la traducción: ${clave}`);
            return;
        }
        const atributo = elemento.dataset.i18nAttr;
        if (atributo) {
            elemento.setAttribute(atributo, texto);
        }
        else {
            elemento.textContent = texto;
        }
    });
    const selectorIdioma = document.getElementById('selector-idioma');
    if (selectorIdioma) {
        selectorIdioma.value = idioma;
    }
}
// Conecta el selector con la función de traducción.
function iniciarSelectorIdioma() {
    const selectorIdioma = document.getElementById('selector-idioma');
    if (!selectorIdioma)
        return;
    selectorIdioma.addEventListener('change', () => {
        const idiomaSeleccionado = selectorIdioma.value;
        aplicarIdioma(idiomaSeleccionado);
        if (localStorage.getItem('guardarIdioma') === 'true') {
            localStorage.setItem('idioma', idiomaSeleccionado);
        }
    });
}
fetch(`${basePath}header.html`)
    .then(response => {
    if (!response.ok) {
        throw new Error('No se pudo cargar la cabecera');
    }
    return response.text();
})
    .then(async (data) => {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer)
        return;
    headerContainer.innerHTML = data;
    // Carga el funcionamiento del menú lateral.
    const rutaMenuLateral = isInsideExtraPages
        ? '../../js/menuLateral.js'
        : isInsideTests || isInsidePages
            ? '../js/menuLateral.js'
            : 'js/menuLateral.js';
    const scriptMenuLateral = document.createElement('script');
    scriptMenuLateral.src = rutaMenuLateral;
    scriptMenuLateral.onload = () => {
        const ventana = window;
        ventana.inicializarMenuLateral?.();
    };
    scriptMenuLateral.onerror = () => {
        console.error('No se pudo cargar menuLateral.js');
    };
    document.head.appendChild(scriptMenuLateral);
    const traduccionesCargadas = await promesaTraducciones;
    if (traduccionesCargadas) {
        const idiomaGuardado = localStorage.getItem('guardarIdioma') === 'true'
            ? localStorage.getItem('idioma')
            : 'es';
        aplicarIdioma(idiomaGuardado || 'es');
        iniciarSelectorIdioma();
    }
    const controlContraste = headerContainer.querySelector('#contraste-alto');
    const controlTema = headerContainer.querySelector('#btn-tema');
    const guardarAccesibilidad = localStorage.getItem('guardarAccesibilidad') === 'true';
    const temaGuardado = guardarAccesibilidad
        ? localStorage.getItem('tema')
        : null;
    const contrasteGuardado = guardarAccesibilidad
        ? localStorage.getItem('contrasteAlto')
        : null;
    const textoGuardado = guardarAccesibilidad
        ? localStorage.getItem('tamanoTexto')
        : null;
    document.body.classList.toggle('modo-oscuro', temaGuardado === 'oscuro');
    if (controlTema) {
        controlTema.checked = temaGuardado === 'oscuro';
    }
    document.body.classList.toggle('alto-contraste', contrasteGuardado === 'true');
    if (controlContraste) {
        controlContraste.checked = contrasteGuardado === 'true';
    }
    const botonesTamano = headerContainer.querySelectorAll('.btn-tamano');
    const anuncioAccesibilidad = headerContainer.querySelector('#anuncio-accesibilidad');
    const tamanosValidos = [
        'pequeno',
        'normal',
        'grande',
        'muy-grande'
    ];
    const nombreTamano = {
        'pequeno': 'Pequeño',
        'normal': 'Normal',
        'grande': 'Grande',
        'muy-grande': 'Muy grande'
    };
    const tamanoInicial = textoGuardado && tamanosValidos.includes(textoGuardado)
        ? textoGuardado
        : 'normal';
    function aplicarTamanoTexto(tamano, anunciar = false) {
        document.documentElement.classList.remove('texto-pequeno', 'texto-normal', 'texto-grande', 'texto-muy-grande');
        document.documentElement.classList.add(`texto-${tamano}`);
        botonesTamano.forEach(btn => {
            const esActivo = btn.dataset.tamano === tamano;
            btn.setAttribute('aria-pressed', String(esActivo));
        });
        if (anunciar && anuncioAccesibilidad) {
            const nombreLegible = nombreTamano[tamano] || tamano;
            anuncioAccesibilidad.textContent =
                `Tamaño del texto establecido en ${nombreLegible}.`;
        }
    }
    aplicarTamanoTexto(tamanoInicial, false);
    botonesTamano.forEach(boton => {
        boton.addEventListener('click', () => {
            const tamano = boton.dataset.tamano;
            if (!tamano || !tamanosValidos.includes(tamano))
                return;
            aplicarTamanoTexto(tamano, true);
            if (localStorage.getItem('guardarAccesibilidad') !== 'false') {
                localStorage.setItem('tamanoTexto', tamano);
            }
        });
    });
    // Cambiar alto contraste.
    if (controlContraste) {
        controlContraste.addEventListener('change', () => {
            const activo = controlContraste.checked;
            document.body.classList.toggle('alto-contraste', activo);
            if (localStorage.getItem('guardarAccesibilidad') !== 'false') {
                localStorage.setItem('contrasteAlto', String(activo));
            }
        });
        // Permitir activar con Enter.
        controlContraste.addEventListener('keydown', (evento) => {
            if (evento.key === 'Enter') {
                evento.preventDefault();
                controlContraste.click();
            }
        });
    }
    // Cambiar modo oscuro.
    if (controlTema) {
        controlTema.addEventListener('change', () => {
            const activo = controlTema.checked;
            document.body.classList.toggle('modo-oscuro', activo);
            if (localStorage.getItem('guardarAccesibilidad') !== 'false') {
                localStorage.setItem('tema', activo ? 'oscuro' : 'claro');
            }
        });
        // Permitir activar con Enter.
        controlTema.addEventListener('keydown', (evento) => {
            if (evento.key === 'Enter') {
                evento.preventDefault();
                controlTema.click();
            }
        });
    }
    // Título de la página.
    const pageTitle = document.body.dataset.pageTitle || 'EcoRuta';
    const titleElement = headerContainer.querySelector('#page-title');
    if (titleElement) {
        titleElement.textContent = pageTitle;
    }
    // Enlaces de navegación.
    const homeLink = headerContainer.querySelector('[data-link="home"]');
    const contactLink = headerContainer.querySelector('[data-link="contact"]');
    const navegacion = headerContainer.querySelector('nav');
    if (!isInsidePages && navegacion) {
        navegacion.remove();
    }
    if (homeLink) {
        homeLink.href = isInsideExtraPages
            ? '../../index.html'
            : isInsidePages
                ? '../index.html'
                : 'index.html';
    }
    if (contactLink) {
        contactLink.href = isInsideExtraPages
            ? 'contacto.html'
            : isInsidePages
                ? 'paginas extra/contacto.html'
                : 'paginas/paginas extra/contacto.html';
    }
    const headerPrincipal = headerContainer.querySelector('header');
    const tituloHeader = headerPrincipal?.querySelector('h1');
    const derechaHeader = headerPrincipal?.querySelector('.header-derecha');
    if (headerPrincipal && tituloHeader && derechaHeader) {
        const revisarApilado = () => {
            const apilado = derechaHeader.offsetTop >
                tituloHeader.offsetTop + tituloHeader.offsetHeight / 2;
            headerPrincipal.classList.toggle('header-apilado', apilado);
        };
        revisarApilado();
        new ResizeObserver(revisarApilado).observe(headerPrincipal);
    }
})
    .catch(error => {
    console.error('Error al cargar la cabecera:', error);
});
fetch(`${basePath}footer.html`)
    .then(response => {
    if (!response.ok) {
        throw new Error('No se pudo cargar el pie de página');
    }
    return response.text();
})
    .then(async (data) => {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = data;
        await promesaTraducciones;
        aplicarIdioma(idiomaActual);
    }
})
    .catch(error => {
    console.error('Error al cargar el pie de página:', error);
});
function cargarAvisoCookies() {
    const contenedorExistente = document.getElementById('aviso-cookies');
    // Si el aviso ya existe en la página, no duplicarlo.
    if (contenedorExistente) {
        iniciarPreferenciasCookies();
        return;
    }
    fetch(`${basePath}aviso-cookies.html`)
        .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el aviso de cookies');
        }
        return response.text();
    })
        .then(async (html) => {
        document.body.insertAdjacentHTML('beforeend', html);
        await promesaTraducciones;
        aplicarIdioma(idiomaActual);
        iniciarPreferenciasCookies();
    })
        .catch(error => {
        console.error('Error al cargar el aviso de cookies:', error);
    });
}
function iniciarPreferenciasCookies() {
    const aviso = document.getElementById('aviso-cookies');
    if (!aviso)
        return;
    const botonAceptar = document.getElementById('aceptar-cookies');
    const botonRechazar = document.getElementById('rechazar-cookies');
    const botonGestionar = document.getElementById('gestionar-cookies');
    const decisionGuardada = localStorage.getItem('decisionCookies');
    aviso.hidden = Boolean(decisionGuardada);
    // Controlar el teclado mientras el aviso esté abierto.
    if (!aviso.dataset.tecladoConfigurado) {
        aviso.dataset.tecladoConfigurado = 'true';
        document.addEventListener('keydown', (evento) => {
            if (aviso.hidden)
                return;
            const panel = document.getElementById('panel-preferencias');
            const panelAbierto = panel && !panel.hidden;
            // Cerrar preferencias con Escape.
            if (evento.key === 'Escape' && panelAbierto) {
                evento.preventDefault();
                panel.hidden = true;
                botonGestionar?.focus();
                return;
            }
            // Permitir activar los checkbox con Enter.
            if (evento.key === 'Enter' &&
                evento.target instanceof HTMLInputElement &&
                evento.target.matches('input[type="checkbox"]') &&
                panelAbierto) {
                evento.preventDefault();
                evento.target.click();
                return;
            }
            // Mantener el foco dentro del contenido activo.
            if (evento.key === 'Tab') {
                const zonaActiva = panelAbierto
                    ? panel
                    : aviso.querySelector('.contenido-cookies');
                if (!zonaActiva)
                    return;
                const elementos = zonaActiva.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href], textarea:not([disabled])');
                if (elementos.length === 0)
                    return;
                const primero = elementos[0];
                const ultimo = elementos[elementos.length - 1];
                if (!zonaActiva.contains(document.activeElement)) {
                    evento.preventDefault();
                    (evento.shiftKey ? ultimo : primero).focus();
                    return;
                }
                if (evento.shiftKey && document.activeElement === primero) {
                    evento.preventDefault();
                    ultimo.focus();
                }
                else if (!evento.shiftKey &&
                    document.activeElement === ultimo) {
                    evento.preventDefault();
                    primero.focus();
                }
            }
        });
    }
    // Colocar el foco dentro del aviso cuando aparece.
    if (!aviso.hidden && !aviso.dataset.focoInicial) {
        aviso.dataset.focoInicial = 'true';
        botonAceptar?.focus();
    }
    // Aceptar preferencias opcionales.
    if (botonAceptar) {
        botonAceptar.addEventListener('click', () => {
            localStorage.setItem('decisionCookies', 'aceptar');
            localStorage.setItem('preferenciasOpcionales', 'true');
            localStorage.setItem('guardarAccesibilidad', 'true');
            localStorage.setItem('guardarIdioma', 'true');
            localStorage.setItem('idioma', idiomaActual);
            aviso.hidden = true;
        });
    }
    if (botonRechazar) {
        botonRechazar.addEventListener('click', () => {
            localStorage.setItem('decisionCookies', 'rechazar');
            localStorage.setItem('preferenciasOpcionales', 'false');
            localStorage.setItem('guardarAccesibilidad', 'false');
            localStorage.setItem('guardarIdioma', 'false');
            localStorage.removeItem('idioma');
            localStorage.removeItem('tema');
            localStorage.removeItem('contrasteAlto');
            localStorage.removeItem('tamanoTexto');
            aplicarIdioma('es');
            aviso.hidden = true;
        });
    }
    // Abrir el panel de gestión.
    if (botonGestionar) {
        botonGestionar.addEventListener('click', () => {
            let panel = document.getElementById('panel-preferencias');
            // Crear el panel una sola vez.
            if (!panel) {
                panel = document.createElement('section');
                panel.id = 'panel-preferencias';
                panel.setAttribute('role', 'dialog');
                panel.setAttribute('aria-labelledby', 'titulo-preferencias');
                panel.innerHTML = `
                    <h2
        id="titulo-preferencias"
        data-i18n="cookies.preferencesTitle"
    >
        Gestionar preferencias
    </h2>

    <p data-i18n="cookies.preferencesDescription">
        Elige qué preferencias deseas guardar en este navegador.
    </p>

    <label>
        <input
            type="checkbox"
            id="preferencia-accesibilidad"
        >
        <span data-i18n="cookies.accessibilityPreference">
            Recordar preferencias de accesibilidad
        </span>
    </label>

    <label>
        <input
            type="checkbox"
            id="preferencia-idioma"
        >
        <span data-i18n="cookies.languagePreference">
            Recordar preferencia de idioma
        </span>
    </label>

    <div class="botones-cookies">
        <button
            type="button"
            id="guardar-preferencias"
            data-i18n="cookies.save"
        >
            Guardar preferencias
        </button>

        <button
            type="button"
            id="cerrar-preferencias"
            data-i18n="cookies.cancel"
        >
            Cancelar
        </button>

        <button
            type="button"
            id="revocar-preferencias"
            data-i18n="cookies.revoke"
        >
            Revocar preferencias
        </button>
    </div>
`;
                aviso.appendChild(panel);
                // Aplicar las traducciones al panel recién creado.
                aplicarIdioma(idiomaActual);
            }
            const accesibilidad = document.getElementById('preferencia-accesibilidad');
            const idioma = document.getElementById('preferencia-idioma');
            accesibilidad.checked =
                localStorage.getItem('guardarAccesibilidad') === 'true';
            idioma.checked =
                localStorage.getItem('guardarIdioma') === 'true';
            panel.hidden = false;
            accesibilidad.focus();
            document.getElementById('guardar-preferencias').onclick = () => {
                const guardarAccesibilidad = accesibilidad.checked;
                const guardarIdioma = idioma.checked;
                localStorage.setItem('guardarAccesibilidad', String(guardarAccesibilidad));
                localStorage.setItem('guardarIdioma', String(guardarIdioma));
                if (guardarIdioma) {
                    localStorage.setItem('idioma', idiomaActual);
                }
                else {
                    localStorage.removeItem('idioma');
                    aplicarIdioma('es');
                }
                localStorage.setItem('decisionCookies', 'personalizada');
                localStorage.setItem('preferenciasOpcionales', String(guardarAccesibilidad || guardarIdioma));
                if (!guardarAccesibilidad) {
                    localStorage.removeItem('tema');
                    localStorage.removeItem('contrasteAlto');
                    localStorage.removeItem('tamanoTexto');
                    document.body.classList.remove('modo-oscuro', 'alto-contraste', 'texto-pequeno', 'texto-normal', 'texto-grande', 'texto-muy-grande');
                    document.body.classList.add('texto-normal');
                    const selector = document.getElementById('tamano-texto');
                    if (selector)
                        selector.value = 'normal';
                    const tema = document.getElementById('btn-tema');
                    if (tema)
                        tema.checked = false;
                    const contraste = document.getElementById('contraste-alto');
                    if (contraste)
                        contraste.checked = false;
                }
                panel.hidden = true;
                aviso.hidden = true;
            };
            document.getElementById('cerrar-preferencias').onclick = () => {
                panel.hidden = true;
                botonGestionar?.focus();
            };
            document.getElementById('revocar-preferencias').onclick = () => {
                localStorage.removeItem('decisionCookies');
                localStorage.removeItem('preferenciasOpcionales');
                localStorage.removeItem('guardarAccesibilidad');
                localStorage.removeItem('guardarIdioma');
                localStorage.removeItem('idioma');
                localStorage.removeItem('tema');
                localStorage.removeItem('contrasteAlto');
                localStorage.removeItem('tamanoTexto');
                aplicarIdioma('es');
                panel.hidden = true;
                aviso.hidden = false;
            };
        });
    }
}
async function inyectarModuloEmergencias() {
    await promesaTraducciones;
    if (document.getElementById('btn-emergencia-flotante'))
        return;
    const emergenciaHTML = `
    <button
        id="btn-emergencia-flotante"
        class="btn-emergencia-sticky"
        type="button"
        aria-label="Abrir contactos de emergencia"
        data-i18n="emergency.openLabel"
        data-i18n-attr="aria-label"
        aria-expanded="false"
        aria-controls="panel-emergencia"
    >
        <span
            class="texto-btn"
            data-i18n="emergency.button"
        >
            Emergencia
        </span>
    </button>

    <section
        id="panel-emergencia"
        class="panel-emergencia oculto"
        tabindex="-1"
        aria-labelledby="titulo-emergencia"
    >
        <h3
            id="titulo-emergencia"
            data-i18n="emergency.title"
        >
            Contactos de emergencia
        </h3>

        <p
            class="aviso-medico"
            data-i18n="emergency.notice"
        >
            Directorio informativo de teléfonos públicos de emergencia.
            EcoRutas no garantiza la atención directa de estos servicios.
        </p>

        <ul>
            <li>
                <span data-i18n="emergency.carabineros">Carabineros</span>
                <a href="tel:133"
   aria-label="Llamar a Carabineros al 133"
   data-i18n="emergency.callCarabineros"
   data-i18n-attr="aria-label">133</a>
                <button type="button"
                    class="btn-copiar-telefono"
                    data-telefono="133"
                    data-i18n="emergency.copy">Copiar</button>
            </li>

            <li>
                <span data-i18n="emergency.ambulance">Ambulancia (SAMU)</span>
                <a href="tel:131"
   aria-label="Llamar a SAMU al 131"
   data-i18n="emergency.callAmbulance"
   data-i18n-attr="aria-label">131</a>
                <button type="button"
                    class="btn-copiar-telefono"
                    data-telefono="131"
                    data-i18n="emergency.copy">Copiar</button>
            </li>

            <li>
                <span data-i18n="emergency.firefighters">Bomberos</span>
                <a href="tel:132"
   aria-label="Llamar a Bomberos al 132"
   data-i18n="emergency.callFirefighters"
   data-i18n-attr="aria-label">132</a>
                <button type="button"
                    class="btn-copiar-telefono"
                    data-telefono="132"
                    data-i18n="emergency.copy">Copiar</button>
            </li>

            <li>
                <span data-i18n="emergency.conaf">CONAF (incendios forestales)</span>
                <a href="tel:130"
   aria-label="Llamar a CONAF al 130"
   data-i18n="emergency.callConaf"
   data-i18n-attr="aria-label">130</a>
                <button type="button"
                    class="btn-copiar-telefono"
                    data-telefono="130"
                    data-i18n="emergency.copy">Copiar</button>
            </li>
        </ul>

        <p id="estado-copia-telefono" role="status" aria-live="polite"></p>

        <button
            id="cerrar-panel-emergencia"
            type="button"
            data-i18n="emergency.close"
        >
            Cerrar
        </button>
    </section>
`;
    document.body.insertAdjacentHTML('beforeend', emergenciaHTML);
    // Aplicar el idioma actual al módulo recién creado.
    aplicarIdioma(idiomaActual);
    const boton = document.getElementById('btn-emergencia-flotante');
    const panel = document.getElementById('panel-emergencia');
    const botonCerrar = document.getElementById('cerrar-panel-emergencia');
    const estadoCopia = document.getElementById('estado-copia-telefono');
    if (!boton || !panel || !botonCerrar || !estadoCopia)
        return;
    boton.addEventListener('click', () => {
        const abierto = boton.getAttribute('aria-expanded') === 'true';
        boton.setAttribute('aria-expanded', String(!abierto));
        panel.classList.toggle('oculto', abierto);
        if (!abierto) {
            panel.focus();
        }
    });
    botonCerrar.addEventListener('click', () => {
        panel.classList.add('oculto');
        boton.setAttribute('aria-expanded', 'false');
        boton.focus();
    });
    panel.querySelectorAll('.btn-copiar-telefono').forEach(botonCopiar => {
        botonCopiar.addEventListener('click', async () => {
            const telefono = botonCopiar.dataset.telefono;
            try {
                await navigator.clipboard.writeText(telefono || '');
                estadoCopia.textContent = obtenerTraduccion('emergency.copied') || '';
            }
            catch (error) {
                estadoCopia.textContent = obtenerTraduccion('emergency.copyError') || '';
            }
        });
    });
    const esComputador = window.matchMedia('(hover: hover) and (pointer: fine)');
    function actualizarBotonesCopiar() {
        panel.querySelectorAll('.btn-copiar-telefono').forEach(botonCopiar => {
            botonCopiar.hidden = !esComputador.matches;
        });
    }
    actualizarBotonesCopiar();
    esComputador.addEventListener('change', actualizarBotonesCopiar);
}
function iniciarModulos() {
    cargarAvisoCookies();
    inyectarModuloEmergencias();
}
// ==========================================================================
// CÁTALOGO DE EMPRENDEDORES (HU-03 / Fetch de emprendedores publicados)
// ==========================================================================
async function cargarEmprendedoresPublicados() {
    const contenedor = document.getElementById('contenedor-emprendedores');
    // Si en la página actual no existe el contenedor, no hace nada
    if (!contenedor)
        return;
    let mensajeEstado = contenedor.querySelector('.mensaje-estado');
    if (!mensajeEstado) {
        mensajeEstado = document.createElement('p');
        mensajeEstado.className = 'mensaje-estado mensaje-cargando';
        contenedor.appendChild(mensajeEstado);
    }
    mensajeEstado.classList.remove('oculto', 'mensaje-error');
    mensajeEstado.classList.add('mensaje-cargando');
    mensajeEstado.textContent = obtenerTraduccion('routes.loading') || '';
    const apiUrl = 'https://6ad90babf89c5702ed9a6190.mockapi.io/emprendedores';
    try {
        const respuesta = await fetch(apiUrl);
        if (!respuesta.ok) {
            throw new Error(`HTTP Error: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        contenedor.innerHTML = '';
        // 3. Filtrar emprendedores con estado "Publicado"
        let publicados = datos.filter(emp => emp.estado === 'Publicado');
        // Novedad: Si estamos en una página de detalle de ciudad, filtramos también por ubicación
        const tituloPagina = document.body.dataset.pageTitle || '';
        if (tituloPagina.includes('Temuco')) {
            publicados = publicados.filter(emp => emp.ubicacion.toLowerCase() === 'temuco');
        }
        else if (tituloPagina.includes('Pucón')) {
            publicados = publicados.filter(emp => emp.ubicacion.toLowerCase() === 'pucón');
        }
        else if (tituloPagina.includes('Villarrica')) {
            publicados = publicados.filter(emp => emp.ubicacion.toLowerCase() === 'villarrica');
        }
        if (publicados.length === 0) {
            contenedor.innerHTML = `
        <p class="mensaje-info" data-i18n="routes.empty">
            ${obtenerTraduccion('routes.empty')}
        </p>
    `;
            return;
        }
        // 4. Dibujar las tarjetas dinámicamente en el DOM
        publicados.forEach(emp => {
            const tarjeta = document.createElement('article');
            tarjeta.className = 'carta-ciudad';
            tarjeta.innerHTML = `
        <h3>${emp.nombre}</h3>
        <p>
        <strong>${obtenerTraduccion('routes.location')}:</strong>
        ${emp.ubicacion}
        </p>
        <p>${emp.descripcion}</p>
        <p>
        <strong>${obtenerTraduccion('routes.score')}:</strong>
        ${emp.puntajeSustentable} / 12
        </p>
        <div class="contacto-emprendedor" style="margin-top: 0.8rem; text-align: center;">
          <a href="https://wa.me/${emp.whatsapp.replace(/\+|\s/g, '')}" target="_blank" rel="noopener noreferrer" class="btn-ciudad">WhatsApp</a>
          <p style="font-size: 0.8rem; margin-top: 0.4rem; color: #4a5568;">${emp.redesSociales}</p>
        </div>
      `;
            contenedor.appendChild(tarjeta);
        });
    }
    catch (error) {
        // 5. Manejo amigable con try/catch sin romper el sitio
        console.error('Error al cargar la lista de emprendedores:', error);
        contenedor.innerHTML = '';
        const parrafoError = document.createElement('p');
        parrafoError.classList.add('mensaje-error');
        parrafoError.textContent = obtenerTraduccion('routes.error') || '';
        contenedor.appendChild(parrafoError);
    }
}
// Ejecutar módulos y catálogo al cargar el DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        iniciarModulos();
        cargarEmprendedoresPublicados();
    });
}
else {
    iniciarModulos();
    cargarEmprendedoresPublicados();
}

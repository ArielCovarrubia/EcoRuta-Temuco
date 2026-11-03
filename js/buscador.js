import { rutas, filtrarRutas } from './rutas.js';

document.addEventListener('DOMContentLoaded', () => {
    const formFiltros = document.getElementById('form-filtros-rutas');
    const selectDificultad = document.getElementById('filtro-dificultad');
    const selectActividad = document.getElementById('filtro-actividad');
    const btnLimpiar = document.getElementById('btn-limpiar-filtros');
    const mensajeSinResultados = document.getElementById('mensaje-sin-resultados');

    const pageTitle = document.body.getAttribute('data-page-title') || '';
    let comunaActual = '';

    if (pageTitle.includes('Pucón')) comunaActual = 'Pucón';
    else if (pageTitle.includes('Temuco')) comunaActual = 'Temuco';
    else if (pageTitle.includes('Villarrica')) comunaActual = 'Villarrica';

    if (!formFiltros) return;

    function aplicarFiltros() {
        const filtros = {
            comuna: comunaActual,
            dificultad: selectDificultad ? selectDificultad.value : '',
            tipoActividad: selectActividad ? selectActividad.value : ''
        };

        const rutasFiltradas = filtrarRutas(rutas, filtros);
        const nombresVisibles = rutasFiltradas.map(r => r.nombre.toLowerCase());

        const tarjetas = document.querySelectorAll('.cartas-img .carta');
        let visiblesContador = 0;

        tarjetas.forEach(tarjeta => {
            const titulo = tarjeta.querySelector('h3')?.textContent?.toLocaleLowerCase() || '';

            const esCoincidente = (!filtros.dificultad && !filtros.tipoActividad) ||
                                  nombresVisibles.some(nombre => titulo.includes(nombre));

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
    }

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
});
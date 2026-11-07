"use strict";
// Inicializa el funcionamiento del menú lateral.
function inicializarMenuLateral() {
    const botonAbrir = document.getElementById('btn-menu-lateral');
    const botonCerrar = document.getElementById('btn-cerrar-menu');
    const menu = document.getElementById('menu-accesibilidad');
    const fondo = document.getElementById('fondo-menu-lateral');
    // Comprobamos que todos los elementos existan.
    if (!botonAbrir || !botonCerrar || !menu || !fondo) {
        console.error('No se encontraron los elementos del menú lateral.');
        return;
    }
    // Referencias seguras para TypeScript.
    const abrir = botonAbrir;
    const cerrar = botonCerrar;
    const panel = menu;
    const overlay = fondo;
    // Evita registrar los eventos más de una vez.
    if (panel.dataset.inicializado === 'true')
        return;
    panel.dataset.inicializado = 'true';
    let menuAbierto = false;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    // Obtiene los elementos que pueden recibir el foco.
    const obtenerElementosEnfocables = () => {
        return Array.from(panel.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(elemento => elemento.offsetParent !== null);
    };
    // Abre el menú lateral.
    function abrirMenu() {
        if (menuAbierto)
            return;
        menuAbierto = true;
        panel.hidden = false;
        overlay.hidden = false;
        panel.setAttribute('aria-hidden', 'false');
        abrir.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(() => {
            panel.classList.add('abierto');
            cerrar.focus();
        });
    }
    // Cierra el menú lateral.
    function cerrarMenu() {
        if (!menuAbierto)
            return;
        menuAbierto = false;
        panel.classList.remove('abierto');
        panel.setAttribute('aria-hidden', 'true');
        abrir.setAttribute('aria-expanded', 'false');
        overlay.hidden = true;
        window.setTimeout(() => {
            if (!menuAbierto) {
                panel.hidden = true;
            }
        }, 300);
        abrir.focus();
    }
    // Eventos de apertura y cierre.
    abrir.addEventListener('click', abrirMenu);
    cerrar.addEventListener('click', cerrarMenu);
    overlay.addEventListener('click', cerrarMenu);
    // Control del teclado.
    document.addEventListener('keydown', (evento) => {
        if (!menuAbierto)
            return;
        if (evento.key === 'Escape') {
            evento.preventDefault();
            cerrarMenu();
            return;
        }
        if (evento.key === 'Tab') {
            const elementos = obtenerElementosEnfocables();
            if (elementos.length === 0) {
                evento.preventDefault();
                cerrar.focus();
                return;
            }
            const primero = elementos[0];
            const ultimo = elementos[elementos.length - 1];
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
// Permite inicializar el menú desde layout.ts.
const ventana = window;
ventana.inicializarMenuLateral = inicializarMenuLateral;

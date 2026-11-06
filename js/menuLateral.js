function inicializarMenuLateral() {
    const botonAbrir = document.getElementById('btn-menu-lateral');
    const botonCerrar = document.getElementById('btn-cerrar-menu');
    const menu = document.getElementById('menu-accesibilidad');
    const fondo = document.getElementById('fondo-menu-lateral');

    if (!botonAbrir || !botonCerrar || !menu || !fondo) {
        console.error('No se encontraron los elementos del menú lateral.');
        return;
    }

    if (menu.dataset.inicializado === 'true') return;
    menu.dataset.inicializado = 'true';

    let menuAbierto = false;

    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-modal', 'true');

    const obtenerElementosEnfocables = () => {
        return Array.from(
            menu.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        ).filter(elemento => elemento.offsetParent !== null);
    };

    function abrirMenu() {
        if (menuAbierto) return;

        menuAbierto = true;

        menu.hidden = false;
        fondo.hidden = false;

        menu.setAttribute('aria-hidden', 'false');
        botonAbrir.setAttribute('aria-expanded', 'true');

        requestAnimationFrame(() => {
            menu.classList.add('abierto');
        });

        botonCerrar.focus();
    }

    function cerrarMenu() {
        if (!menuAbierto) return;

        menuAbierto = false;

        menu.classList.remove('abierto');
        menu.setAttribute('aria-hidden', 'true');
        botonAbrir.setAttribute('aria-expanded', 'false');
        fondo.hidden = true;

        window.setTimeout(() => {
            if (!menuAbierto) {
                menu.hidden = true;
            }
        }, 300);

        botonAbrir.focus();
    }

    botonAbrir.addEventListener('click', abrirMenu);
    botonCerrar.addEventListener('click', cerrarMenu);
    fondo.addEventListener('click', cerrarMenu);

    document.addEventListener('keydown', evento => {
        if (!menuAbierto) return;

        if (evento.key === 'Escape') {
            evento.preventDefault();
            cerrarMenu();
            return;
        }

        if (evento.key === 'Tab') {
            const elementos = obtenerElementosEnfocables();

            if (elementos.length === 0) {
                evento.preventDefault();
                botonCerrar.focus();
                return;
            }

            const primero = elementos[0];
            const ultimo = elementos[elementos.length - 1];

            if (evento.shiftKey && document.activeElement === primero) {
                evento.preventDefault();
                ultimo.focus();
            } else if (
                !evento.shiftKey &&
                document.activeElement === ultimo
            ) {
                evento.preventDefault();
                primero.focus();
            }
        }
    });
}

window.inicializarMenuLateral = inicializarMenuLateral;
// 1. SELECCIÓN DE ELEMENTOS
const btnEmergencia = document.querySelector('#btn-emergencia-flotante');
const panelEmergencia = document.querySelector('#panel-emergencia');

if (btnEmergencia && panelEmergencia) {
    // 2. EVENTO DE CLIC
    btnEmergencia.addEventListener('click', function() {
        // Toggle de la clase oculto
        panelEmergencia.classList.toggle('oculto');

        // Comprobar si quedó visible
        const estaAbierto = !panelEmergencia.classList.contains('oculto');

        // Actualizar estado ARIA
        btnEmergencia.setAttribute('aria-expanded', estaAbierto);

        // Mover foco al panel si se abrió (Accesibilidad)
        if (estaAbierto) {
            panelEmergencia.focus();
        }
    });
}
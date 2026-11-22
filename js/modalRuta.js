import { rutas } from './rutas.js';
import { datosRutas } from './detalleRutas.js';
let elementoPrevioEnfocado = null;
// Claves i18n de los valores del catálogo (las mismas de los <option> de los filtros).
const CLAVES_VALORES_CATALOGO = {
    "Fácil": "routes.easy",
    "Media": "routes.medium",
    "Difícil": "routes.hard",
    "Senderismo": "routes.hiking",
    "Trekking": "routes.trekking",
    "Cultura y Naturaleza": "routes.cultureNature"
};
function traducirValorCatalogo(valor) {
    const clave = CLAVES_VALORES_CATALOGO[valor];
    return (clave && obtenerTraduccion(clave)) || valor;
}
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-detalle-ruta");
    const btnCerrar = document.getElementById("btn-cerrar-modal");
    const tarjetas = document.querySelectorAll(".cartas-img .carta");
    if (!modal)
        return;
    // Asignar accesibilidad y eventos a las tarjetas
    tarjetas.forEach((carta) => {
        carta.setAttribute("tabindex", "0");
        carta.setAttribute("role", "button");
        carta.setAttribute("aria-haspopup", "dialog");
        const idRuta = carta.getAttribute("data-id");
        if (!idRuta)
            return;
        carta.addEventListener("click", () => abrirModal(idRuta, carta));
        carta.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                abrirModal(idRuta, carta);
            }
        });
    });
    // Función para abrir el Modal
    function abrirModal(idRuta, elementoDisparador) {
        const info = datosRutas[idRuta];
        // La dificultad y el tipo de actividad salen del catálogo (fuente única),
        // los mismos valores que usan las tarjetas y los filtros.
        const ruta = rutas.find(r => String(r.id) === idRuta);
        if (!info || !modal)
            return;
        elementoPrevioEnfocado = elementoDisparador || document.activeElement;
        const elTitulo = document.getElementById("modal-titulo-ruta");
        const elImg = document.getElementById("modal-img-ruta");
        const elDesc = document.getElementById("modal-descripcion-ruta");
        const elDificultad = document.getElementById("modal-dificultad");
        const elActividad = document.getElementById("modal-actividad");
        const elFecha = document.getElementById("modal-fecha-inicio");
        const elDuracion = document.getElementById("modal-duracion");
        const elUbicacion = document.getElementById("modal-ubicacion");
        const elAtractivos = document.getElementById("modal-atractivos");
        if (elTitulo)
            elTitulo.textContent = info.titulo;
        if (elImg) {
            elImg.src = info.imagen;
            elImg.alt = ""; // Punto 7 PR: alt decorativo para no duplicar h2
        }
        if (elDesc)
            elDesc.textContent = info.descripcion;
        if (elDificultad && ruta)
            elDificultad.textContent = traducirValorCatalogo(ruta.dificultad);
        if (elActividad && ruta)
            elActividad.textContent = traducirValorCatalogo(ruta.tipoActividad);
        if (elFecha)
            elFecha.textContent = info.fechaInicio;
        if (elDuracion)
            elDuracion.textContent = info.duracion;
        if (elUbicacion)
            elUbicacion.textContent = info.ubicacion;
        if (elAtractivos)
            elAtractivos.textContent = info.atractivos;
        modal?.classList.remove("oculto");
        modal?.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-abierto");
        if (btnCerrar)
            btnCerrar.focus();
    }
    // Función para cerrar el Modal
    function cerrarModal() {
        if (!modal)
            return;
        modal.classList.add("oculto");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-abierto");
        if (elementoPrevioEnfocado)
            elementoPrevioEnfocado.focus();
    }
    if (btnCerrar)
        btnCerrar.addEventListener("click", cerrarModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal)
            cerrarModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("oculto")) {
            cerrarModal();
        }
    });
    modal.addEventListener("keydown", (e) => {
        if (e.key === "Tab" && btnCerrar) {
            e.preventDefault();
            btnCerrar.focus();
        }
    });
});

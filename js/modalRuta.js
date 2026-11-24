import { rutas } from './rutas.js';
import { datosRutas } from './detalleRutas.js';
let elementoPrevioEnfocado = null;
// ----------------------------------------------------------------------
// Favoritos (se guardan en localStorage bajo la clave "favoritos")
// ----------------------------------------------------------------------
function obtenerFavoritos() {
    try {
        const guardados = JSON.parse(localStorage.getItem("favoritos") || "[]");
        return Array.isArray(guardados)
            ? guardados.map(Number).filter(Number.isFinite)
            : [];
    }
    catch {
        return [];
    }
}
function esFavorita(idRuta) {
    return obtenerFavoritos().includes(Number(idRuta));
}
function actualizarBotonFavorito(boton, idRuta) {
    const activo = esFavorita(idRuta);
    boton.textContent = activo ? "♥" : "♡";
    boton.classList.toggle("activo", activo);
    boton.setAttribute("aria-pressed", String(activo));
    boton.setAttribute("aria-label", activo
        ? obtenerTraduccion("a11y.removeFavorite") || "Quitar ruta de favoritos"
        : obtenerTraduccion("a11y.addFavorite") || "Agregar ruta a favoritos");
}
function alternarFavorito(idRuta) {
    const id = Number(idRuta);
    const favoritos = obtenerFavoritos();
    const nuevosFavoritos = favoritos.includes(id)
        ? favoritos.filter(favorito => favorito !== id)
        : [...favoritos, id];
    try {
        localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    }
    catch {
        // Sin almacenamiento disponible: el estado visual no cambia.
    }
    // Actualizar todos los corazones de la página (tarjetas, ficha y modal).
    document.querySelectorAll(".btn-favorito[data-id-ruta]").forEach(boton => {
        actualizarBotonFavorito(boton, boton.dataset.idRuta ?? "");
    });
    const botonModal = document.getElementById("btn-favorito-modal");
    if (botonModal)
        actualizarBotonFavorito(botonModal, id);
}
// Claves i18n de los valores del catálogo (las mismas de los <option> de los filtros).
const CLAVES_VALORES_CATALOGO = {
    "Fácil": "routes.easy",
    "Media": "routes.medium",
    "Difícil": "routes.hard",
    "Senderismo": "routes.hiking",
    "Trekking": "routes.trekking",
    "Cultura y Naturaleza": "routes.cultureNature"
};
// Clave de traducción de cada comuna (secciones de idiomas.json).
const CLAVES_COMUNA = {
    "Temuco": "temuco",
    "Pucón": "pucon",
    "Villarrica": "villarrica"
};
function textoFicha(idRuta, campo, respaldo) {
    return obtenerTraduccion(`routeDetails.${idRuta}.${campo}`) || respaldo;
}
function traducirValorCatalogo(valor) {
    const clave = CLAVES_VALORES_CATALOGO[valor];
    return (clave && obtenerTraduccion(clave)) || valor;
}
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-detalle-ruta");
    const btnCerrar = document.getElementById("btn-cerrar-modal");
    const tarjetas = document.querySelectorAll(".cartas-img .carta");
    document.querySelectorAll(".btn-favorito[data-id-ruta]").forEach(boton => {
        const id = boton.dataset.idRuta;
        if (!id)
            return;
        actualizarBotonFavorito(boton, id);
        boton.addEventListener("click", (e) => {
            e.stopPropagation();
            alternarFavorito(id);
        });
    });
    document.addEventListener("idiomacambiado", () => {
        document.querySelectorAll(".btn-favorito[data-id-ruta]").forEach(boton => {
            actualizarBotonFavorito(boton, boton.dataset.idRuta ?? "");
        });
    });
    if (!modal)
        return;
    const btnFavoritoModal = document.getElementById("btn-favorito-modal");
    let rutaActualId = null;
    if (btnFavoritoModal) {
        btnFavoritoModal.addEventListener("click", (e) => {
            e.stopPropagation();
            if (rutaActualId)
                alternarFavorito(rutaActualId);
        });
    }
    // Asignar accesibilidad y eventos a las tarjetas
    tarjetas.forEach((carta) => {
        carta.setAttribute("tabindex", "0");
        carta.setAttribute("role", "button");
        carta.setAttribute("aria-haspopup", "dialog");
        const idRuta = carta.getAttribute("data-id");
        if (!idRuta)
            return;
        // Botón de favoritos de la tarjeta
        const btnFavorito = document.createElement("button");
        btnFavorito.type = "button";
        btnFavorito.className = "btn-favorito";
        btnFavorito.dataset.idRuta = idRuta;
        actualizarBotonFavorito(btnFavorito, idRuta);
        // Evitar que el corazón abra el modal
        btnFavorito.addEventListener("click", (e) => {
            e.stopPropagation();
            alternarFavorito(idRuta);
        });
        carta.prepend(btnFavorito);
        carta.addEventListener("click", () => abrirModal(idRuta, carta));
        carta.addEventListener("keydown", (e) => {
            if ((e.key === "Enter" || e.key === " ") && e.target === carta) {
                e.preventDefault();
                abrirModal(idRuta, carta);
            }
        });
    });
    // Rellena la ficha con los datos de la ruta en el idioma actual.
    function rellenarModal(idRuta) {
        const info = datosRutas[idRuta];
        const ruta = rutas.find(r => String(r.id) === idRuta);
        if (!info)
            return;
        const elTitulo = document.getElementById("modal-titulo-ruta");
        const elImg = document.getElementById("modal-img-ruta");
        const elDesc = document.getElementById("modal-descripcion-ruta");
        const elDificultad = document.getElementById("modal-dificultad");
        const elActividad = document.getElementById("modal-actividad");
        const elFecha = document.getElementById("modal-fecha-inicio");
        const elDuracion = document.getElementById("modal-duracion");
        const elUbicacion = document.getElementById("modal-ubicacion");
        const elAtractivos = document.getElementById("modal-atractivos");
        const claveComuna = ruta ? CLAVES_COMUNA[ruta.comuna] : undefined;
        const titulo = claveComuna
            ? obtenerTraduccion(`${claveComuna}.route${idRuta}Name`) || info.titulo
            : info.titulo;
        if (elTitulo)
            elTitulo.textContent = titulo;
        if (elImg) {
            elImg.src = info.imagen;
            elImg.alt = "";
        }
        if (elDesc)
            elDesc.textContent = textoFicha(idRuta, "description", info.descripcion);
        if (elDificultad && ruta)
            elDificultad.textContent = traducirValorCatalogo(ruta.dificultad);
        if (elActividad && ruta)
            elActividad.textContent = traducirValorCatalogo(ruta.tipoActividad);
        if (elFecha)
            elFecha.textContent = textoFicha(idRuta, "startDate", info.fechaInicio);
        if (elDuracion)
            elDuracion.textContent = textoFicha(idRuta, "duration", info.duracion);
        if (elUbicacion)
            elUbicacion.textContent = textoFicha(idRuta, "location", info.ubicacion);
        if (elAtractivos)
            elAtractivos.textContent = textoFicha(idRuta, "attractions", info.atractivos);
    }
    // Función para abrir el Modal
    function abrirModal(idRuta, elementoDisparador) {
        if (!datosRutas[idRuta] || !modal)
            return;
        rutaActualId = idRuta;
        if (btnFavoritoModal)
            actualizarBotonFavorito(btnFavoritoModal, idRuta);
        elementoPrevioEnfocado = elementoDisparador || document.activeElement;
        rellenarModal(idRuta);
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
    document.addEventListener("idiomacambiado", () => {
        if (!rutaActualId)
            return;
        if (btnFavoritoModal)
            actualizarBotonFavorito(btnFavoritoModal, rutaActualId);
        if (!modal.classList.contains("oculto"))
            rellenarModal(rutaActualId);
    });
});

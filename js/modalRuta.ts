import { rutas } from './rutas.js';
import { datosRutas } from './detalleRutas.js';

let elementoPrevioEnfocado: HTMLElement | null = null;

// ----------------------------------------------------------------------
// Favoritos (se guardan en localStorage bajo la clave "favoritos")
// ----------------------------------------------------------------------
function obtenerFavoritos(): number[] {
    try {
        const guardados: unknown = JSON.parse(localStorage.getItem("favoritos") || "[]");
        return Array.isArray(guardados)
            ? guardados.map(Number).filter(Number.isFinite)
            : [];
    } catch {
        return [];
    }
}

function esFavorita(idRuta: string | number): boolean {
    return obtenerFavoritos().includes(Number(idRuta));
}

function actualizarBotonFavorito(boton: HTMLElement, idRuta: string | number): void {
    const activo = esFavorita(idRuta);

    boton.textContent = activo ? "♥" : "♡";
    boton.classList.toggle("activo", activo);
    boton.setAttribute("aria-pressed", String(activo));
    boton.setAttribute(
        "aria-label",
        activo ? "Quitar ruta de favoritos" : "Agregar ruta a favoritos"
    );
}

function alternarFavorito(idRuta: string | number): void {
    const id = Number(idRuta);
    const favoritos = obtenerFavoritos();
    const nuevosFavoritos = favoritos.includes(id)
        ? favoritos.filter(favorito => favorito !== id)
        : [...favoritos, id];

    try {
        localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    } catch {
        // Sin almacenamiento disponible: el estado visual no cambia.
    }

    // Actualizar todos los corazones de la página (tarjetas, ficha y modal).
    document.querySelectorAll<HTMLElement>(".btn-favorito[data-id-ruta]").forEach(boton => {
        actualizarBotonFavorito(boton, boton.dataset.idRuta ?? "");
    });

    const botonModal = document.getElementById("btn-favorito-modal");
    if (botonModal) actualizarBotonFavorito(botonModal, id);
}

// Claves i18n de los valores del catálogo (las mismas de los <option> de los filtros).
const CLAVES_VALORES_CATALOGO: Record<string, string> = {
    "Fácil": "routes.easy",
    "Media": "routes.medium",
    "Difícil": "routes.hard",
    "Senderismo": "routes.hiking",
    "Trekking": "routes.trekking",
    "Cultura y Naturaleza": "routes.cultureNature"
};

function traducirValorCatalogo(valor: string): string {
    const clave = CLAVES_VALORES_CATALOGO[valor];
    return (clave && obtenerTraduccion(clave)) || valor;
}

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-detalle-ruta") as HTMLDivElement | null;
    const btnCerrar = document.getElementById("btn-cerrar-modal") as HTMLButtonElement | null;
    const tarjetas = document.querySelectorAll<HTMLElement>(".cartas-img .carta");

    document.querySelectorAll<HTMLElement>(".btn-favorito[data-id-ruta]").forEach(boton => {
        const id = boton.dataset.idRuta;
        if (!id) return;
        actualizarBotonFavorito(boton, id);
        boton.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            alternarFavorito(id);
        });
    });

    if (!modal) return;

    const btnFavoritoModal = document.getElementById("btn-favorito-modal") as HTMLButtonElement | null;
    let rutaActualId: string | null = null;

    if (btnFavoritoModal) {
        btnFavoritoModal.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            if (rutaActualId) alternarFavorito(rutaActualId);
        });
    }

    // Asignar accesibilidad y eventos a las tarjetas
    tarjetas.forEach((carta) => {
        carta.setAttribute("tabindex", "0");
        carta.setAttribute("role", "button");
        carta.setAttribute("aria-haspopup", "dialog");
        
        const idRuta = carta.getAttribute("data-id");
        if (!idRuta) return;

        // Botón de favoritos de la tarjeta
        const btnFavorito = document.createElement("button");
        btnFavorito.type = "button";
        btnFavorito.className = "btn-favorito";
        btnFavorito.dataset.idRuta = idRuta;
        actualizarBotonFavorito(btnFavorito, idRuta);

        // Evitar que el corazón abra el modal
        btnFavorito.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            alternarFavorito(idRuta);
        });
        carta.prepend(btnFavorito);

        carta.addEventListener("click", () => abrirModal(idRuta, carta));
        carta.addEventListener("keydown", (e: KeyboardEvent) => {
            if ((e.key === "Enter" || e.key === " ") && e.target === carta) {
                e.preventDefault();
                abrirModal(idRuta, carta);
            }
        });
    });

    // Función para abrir el Modal
    function abrirModal(idRuta: string, elementoDisparador: HTMLElement): void {
        const info = datosRutas[idRuta];
        const ruta = rutas.find(r => String(r.id) === idRuta);
        if (!info || !modal) return;

        rutaActualId = idRuta;
        if (btnFavoritoModal) actualizarBotonFavorito(btnFavoritoModal, idRuta);

        elementoPrevioEnfocado = elementoDisparador || (document.activeElement as HTMLElement);

        const elTitulo = document.getElementById("modal-titulo-ruta") as HTMLHeadingElement | null;
        const elImg = document.getElementById("modal-img-ruta") as HTMLImageElement | null;
        const elDesc = document.getElementById("modal-descripcion-ruta") as HTMLParagraphElement | null;
        const elDificultad = document.getElementById("modal-dificultad") as HTMLSpanElement | null;
        const elActividad = document.getElementById("modal-actividad") as HTMLSpanElement | null;
        const elFecha = document.getElementById("modal-fecha-inicio") as HTMLSpanElement | null;
        const elDuracion = document.getElementById("modal-duracion") as HTMLSpanElement | null;
        const elUbicacion = document.getElementById("modal-ubicacion") as HTMLSpanElement | null;
        const elAtractivos = document.getElementById("modal-atractivos") as HTMLSpanElement | null;

        if (elTitulo) elTitulo.textContent = info.titulo;
        if (elImg) {
            elImg.src = info.imagen;
            elImg.alt = ""; // Punto 7 PR: alt decorativo para no duplicar h2
        }
        if (elDesc) elDesc.textContent = info.descripcion;
        if (elDificultad && ruta) elDificultad.textContent = traducirValorCatalogo(ruta.dificultad);
        if (elActividad && ruta) elActividad.textContent = traducirValorCatalogo(ruta.tipoActividad);
        if (elFecha) elFecha.textContent = info.fechaInicio;
        if (elDuracion) elDuracion.textContent = info.duracion;
        if (elUbicacion) elUbicacion.textContent = info.ubicacion;
        if (elAtractivos) elAtractivos.textContent = info.atractivos;

        modal?.classList.remove("oculto");
        modal?.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-abierto");

        if (btnCerrar) btnCerrar.focus();
    }

    // Función para cerrar el Modal
    function cerrarModal(): void {
        if (!modal) return;
        modal.classList.add("oculto");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-abierto");

        if (elementoPrevioEnfocado) elementoPrevioEnfocado.focus();
    }

    if (btnCerrar) btnCerrar.addEventListener("click", cerrarModal);

    modal.addEventListener("click", (e: MouseEvent) => {
        if (e.target === modal) cerrarModal();
    });

    document.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Escape" && !modal.classList.contains("oculto")) {
            cerrarModal();
        }
    });

    modal.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Tab" && btnCerrar) {
            e.preventDefault();
            btnCerrar.focus();
        }
    });
});
interface DetalleRuta {
    titulo: string;
    imagen: string;
    descripcion: string;
    fechaInicio: string;
    duracion: string;
    ubicacion: string;
    atractivos: string;
}

interface DictionarioRutas {
    [key: string]: DetalleRuta;
}

const datosRutas: DictionarioRutas = {
    // ----------------------------------------------------------------------
    // TEMUCO (IDs 1 - 5)
    // ----------------------------------------------------------------------
    "1": {
        titulo: "Cerro Ñielol",
        imagen: "../assets/imagenes/cerro-nielol.webp",
        descripcion: "Monumento Natural ubicado a pasos del centro de Temuco. Cuenta con senderos rodeados de selva valdiviana e impresionantes miradores hacia la ciudad.",
        fechaInicio: "Lunes a Domingo - 08:30 AM",
        duracion: "2 horas (dificultad baja)",
        ubicacion: "Av. Arturo Prat final, Temuco",
        atractivos: "Pataguas monumentales, Mirador Antupirén, Centro de Información Ambiental"
    },
    "2": {
        titulo: "Parque Nacional Huerquehue",
        imagen: "../assets/imagenes/paque-huerquehue.webp",
        descripcion: "Recorrido entre milenarias araucarias y hermosas lagunas cordilleranas de origen volcánico. Un clásico del trekking en la Araucanía.",
        fechaInicio: "Martes a Domingo - 08:00 AM",
        duracion: "5 a 6 horas (dificultad media)",
        ubicacion: "Sector Lago Tinquilco, Caburgua / Temuco",
        atractivos: "Laguna Verde, Lago Toro, Araucanía milenarias, cascadas"
    },
    "3": {
        titulo: "Reserva Nacional Malalcahuello",
        imagen: "../assets/imagenes/reserva-malalcahuello.webp",
        descripcion: "Espectacular sendero entre escoriales volcánicos y bosques nativos a los pies del volcán Lonquimay.",
        fechaInicio: "Miércoles a Domingo - 09:00 AM",
        duracion: "4 horas (dificultad media)",
        ubicacion: "Comuna de Curacautín / Ruta internacional",
        atractivos: "Cráter Navidad, Bosque de Araucarias, Vistas al Volcán Lonquimay"
    },
    "4": {
        titulo: "Isla Cautín",
        imagen: "../assets/imagenes/isla-cautin.webp",
        descripcion: "Extenso parque urbano junto al río Cautín con ciclovías, plazas temáticas y senderos de caminata accesible.",
        fechaInicio: "Todos los días - 07:00 AM a 20:00 PM",
        duracion: "1.5 horas (caminara familiar)",
        ubicacion: "Borde Río Cautín, Temuco",
        atractivos: "Plaza de los Plátanos, ciclovías, juegos inclusivos, vegetación riberana"
    },
    "5": {
        titulo: "Monumento Cerro Ñielol",
        imagen: "../assets/imagenes/monumento-cerro-nielol.webp",
        descripcion: "Sitio de alto valor histórico y cultural mapuche, donde se ubican los Chemamüll y el hito del parlamento de 1881.",
        fechaInicio: "Martes a Domingo - 09:00 AM",
        duracion: "1 hora (recorrido cultural)",
        ubicacion: "Cumbre Cerro Ñielol, Temuco",
        atractivos: "Esculturas Chemamüll, Bosque Nativo, Hito Histórico de Paz"
    },
    // ----------------------------------------------------------------------
    // PUCÓN (IDs 6 - 10)
    // ----------------------------------------------------------------------
    "6": {
        titulo: "Salto La China",
        imagen: "assets/imagenes/salto-la-china.webp",
        descripcion: "Camina hasta esta impresionante cascada escondida de 30 metros de caída entre denso bosque nativo y rocas volcánicas.",
        fechaInicio: "Sábados y Domingos - 09:00 AM",
        duracion: "2 horas (caminata suave)",
        ubicacion: "KM 30 camino a Palguín, Pucón",
        atractivos: "Cascada de 30m, flora nativa, avistamiento de aves local"
    },
    "7": {
        titulo: "Termas de Huife",
        imagen: "../assets/imagenes/termas-huife.webp",
        descripcion: "Piscinas de aguas termales naturales a orillas del río Liucura. Perfecto para una jornada de descanso y revitalización.",
        fechaInicio: "Todos los días - 10:00 AM",
        duracion: "4 horas (recreativo)",
        ubicacion: "Sector Huife Alto, Pucón",
        atractivos: "Aguas termales, hidromasaje natural, bosque nativo"
    },
    "8": {
        titulo: "Ojos del Caburgua",
        imagen: "../assets/imagenes/ojos-caburgua.webp",
        descripcion: "Pozas profundas de agua color turquesa formadas por vertientes subterráneas del Lago Caburgua que afloran entre la vegetación.",
        fechaInicio: "Lunes a Domingo - 09:30 AM",
        duracion: "1.5 horas (pasarelas accesibles)",
        ubicacion: "Sector Caburga, Pucón",
        atractivos: "Pozas turquesa, pasarelas de madera, cascadas menores"
    },
    "9": {
        titulo: "Reserva Nacional Cañi",
        imagen: "../assets/imagenes/reserva-cani.webp",
        descripcion: "Una de las primeras reservas privadas del país. Trekking exigente rodeado de araucarias milenarias y miradores hacia los volcanes.",
        fechaInicio: "Martes a Domingo - 08:30 AM",
        duracion: "6 a 8 horas (exigente)",
        ubicacion: "Sector Pichares, Pucón",
        atractivos: "Araucarias milenarias, lagunas de altura, vista panorámica de volcanes"
    },
    "10": {
        titulo: "Cañón del Río Trancura",
        imagen: "../assets/imagenes/canon-trancura.webp",
        descripcion: "Recorrido de rafting y senderismo a lo largo del cañón del río Trancura, combinando adrenalina y hermosos paisajes cordilleranos.",
        fechaInicio: "Diario - 11:00 AM y 15:00 PM",
        duracion: "3 horas (actividad acuática)",
        ubicacion: "Río Trancura, Pucón",
        atractivos: "Rápidos clase III/IV, cañón rocoso, bosque templado lluvioso"
    },
    // ----------------------------------------------------------------------
    // VILLARRICA (IDs 11 - 15)
    // ----------------------------------------------------------------------
    "11": {
        titulo: "Costanera de Villarrica",
        imagen: "../assets/imagenes/costanera-villarrica.webp",
        descripcion: "Paseo peatonal bordeando el lago Villarrica con playas de arena volcánica y vistas privilegiadas al volcán.",
        fechaInicio: "Acceso libre 24/7",
        duracion: "1.5 horas (caminata contemplativa)",
        ubicacion: "Av. Costanera, Villarrica",
        atractivos: "Playa grande, esculturas locales, atardecer sobre el lago"
    },
    "12": {
        titulo: "Museo Histórico y Arqueológico",
        imagen: "../assets/imagenes/museo-villarrica.webp",
        descripcion: "Exhibición permanente de cerámica, platería y piezas arqueológicas que rescatan la rica historia de la cultura Mapuche.",
        fechaInicio: "Lunes a Viernes - 10:00 AM a 18:00 PM",
        duracion: "1 hora (visita guiada)",
        ubicacion: "Pedro de Valdivia 365, Villarrica",
        atractivos: "Platería mapuche, cerámica ancestral, documentos históricos"
    },
    "13": {
        titulo: "Feria Costumbrista Mapuche",
        imagen: "../assets/imagenes/feria-costumbrista.webp",
        descripcion: "Espacio cultural y gastronómico donde artesanos locales ofrecen productos típicos, textiles en telar y comida tradicional.",
        fechaInicio: "Miércoles a Domingo - 11:00 AM",
        duracion: "2 horas (gastronomía y compras)",
        ubicacion: "Sector Muelle Histórico, Villarrica",
        atractivos: "Gastronomía mapuche, artesanía en madera y telar, música folclórica"
    },
    "14": {
        titulo: "Termas Geométricas",
        imagen: "../assets/imagenes/termas-geometricas.webp",
        descripcion: "Santuario termal en medio de una quebrada nativa, articulado por pasarelas rojas de madera rodeadas de vegetación exuberante.",
        fechaInicio: "Todos los días - 10:00 AM",
        duracion: "4 horas",
        ubicacion: "Fundo Coñaripe / Panguipulli cerca de Villarrica",
        atractivos: "20 pozas termales, pasarelas rojas, cascada natural"
    },
    "15": {
        titulo: "Mirador Bellavista",
        imagen: "../assets/imagenes/mirador-villarrica.webp",
        descripcion: "Punto elevado en la zona alta de la ciudad que ofrece una vista panorámica despejada del Lago y el Volcán Villarrica.",
        fechaInicio: "Acceso libre 24/7",
        duracion: "1 hora",
        ubicacion: "Sector Bellavista, Villarrica",
        atractivos: "Vista 360°, fotografía de paisajes, avistamiento del volcán"
    }
};

let elementoPrevioEnfocado: HTMLElement | null = null;

document.addEventListener("DOMContentLoaded", (): void => {
    const modal = document.getElementById("modal-detalle-ruta") as HTMLElement | null;
    const btnCerrar = document.getElementById("btn-cerrar-modal") as HTMLButtonElement | null;
    const tarjetas = document.querySelectorAll<HTMLElement>(".cartas-img .carta");

    if (!modal) return;

    // Asignar accesibilidad y eventos a las tarjetas
    tarjetas.forEach((carta: HTMLElement) => {
        carta.setAttribute("tabindex", "0");
        carta.setAttribute("role", "button");
        carta.setAttribute("aria-haspopup", "dialog");

        const idRuta = carta.getAttribute("data-id");
        if (!idRuta) return;

        carta.addEventListener("click", () => abrirModal(idRuta, carta));
        carta.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                abrirModal(idRuta, carta);
            }
        });
    });

    // Función para abrir el Modal
    function abrirModal(idRuta: string, elementoDisparador: HTMLElement): void {
        const info = datosRutas[idRuta];
        if (!info) return;

        elementoPrevioEnfocado = elementoDisparador || (document.activeElement as HTMLElement);

        const elTitulo = document.getElementById("modal-titulo-ruta");
        const elImg = document.getElementById("modal-img-ruta") as HTMLImageElement | null;
        const elDesc = document.getElementById("modal-descripcion-ruta");
        const elFecha = document.getElementById("modal-fecha-inicio");
        const elDuracion = document.getElementById("modal-duracion");
        const elUbicacion = document.getElementById("modal-ubicacion");
        const elAtractivos = document.getElementById("modal-atractivos");

        if (elTitulo) elTitulo.textContent = info.titulo;
        if (elImg) {
            elImg.src = info.imagen;
            elImg.alt = info.titulo;
        }
        if (elDesc) elDesc.textContent = info.descripcion;
        if (elFecha) elFecha.textContent = info.fechaInicio;
        if (elDuracion) elDuracion.textContent = info.duracion;
        if (elUbicacion) elUbicacion.textContent = info.ubicacion;
        if (elAtractivos) elAtractivos.textContent = info.atractivos;

        modal?.classList.remove("oculto");
        modal?.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-abierto");

        if (btnCerrar) {
            btnCerrar.focus();
        }
    }

    // Función para cerrar el Modal
    function cerrarModal(): void {
        modal?.classList.add("oculto");
        modal?.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-abierto");

        if (elementoPrevioEnfocado) {
            elementoPrevioEnfocado.focus();
        }
    }

    if (btnCerrar) {
        btnCerrar.addEventListener("click", cerrarModal);
    }

    modal.addEventListener("click", (e: MouseEvent) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });

    document.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Escape" && !modal.classList.contains("oculto")) {
            cerrarModal();
        }
    });
});
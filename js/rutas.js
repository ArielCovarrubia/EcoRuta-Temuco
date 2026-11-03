export const rutas = [
    // ----------------------------------------------------------------------
    // RUTAS DE TEMUCO
    // ----------------------------------------------------------------------
    {
        id: 1,
        nombre: "Cerro Ñielol",
        comuna: "Temuco",
        descripcion: "Admira vistas panorámicas de la ciudad de Temuco desde este impresionante cerro.",
        dificultad: "Fácil",
        tipoActividad: "Senderismo",
        imagen: "assets/imagenes/cerro-nielol.webp",
        urlDetalle: "paginas/paginas extra/ruta-temuco.html"
    },
    {
        id: 2,
        nombre: "Parque Nacional Huerquehue",
        comuna: "Temuco",
        descripcion: "Recorre senderos rodeados de naturaleza y disfruta de vistas panorámicas de la región.",
        dificultad: "Media",
        tipoActividad: "Trekking",
        imagen: "assets/imagenes/paque-huerquehue.webp"
    },
    {
        id: 3,
        nombre: "Reserva Nacional Malalcahuello",
        comuna: "Temuco",
        descripcion: "Camina por un sendero ecológico rodeado de flora y fauna nativa.",
        dificultad: "Media",
        tipoActividad: "Senderismo",
        imagen: "assets/imagenes/reserva-malalcahuello.webp"
    },
    {
        id: 4,
        nombre: "Isla Cautín",
        comuna: "Temuco",
        descripcion: "Disfruta de este espacio verde ideal para caminatas y actividades al aire libre.",
        dificultad: "Fácil",
        tipoActividad: "Senderismo",
        imagen: "assets/imagenes/isla-cautin.webp"
    },
    {
        id: 5,
        nombre: "Monumento Cerro Ñielol",
        comuna: "Temuco",
        descripcion: "Conoce la historia y la cultura de Temuco en este emblemático monumento.",
        dificultad: "Fácil",
        tipoActividad: "Cultura y Naturaleza",
        imagen: "assets/imagenes/monumento-cerro-nielol.webp"
    },
    // ----------------------------------------------------------------------
    // RUTAS DE PUCÓN
    // ----------------------------------------------------------------------
    {
        id: 6,
        nombre: "Salto La China",
        comuna: "Pucón",
        descripcion: "Camina hasta esta cascada escondida entre bosque nativo, ideal para una caminata corta.",
        dificultad: "Fácil",
        tipoActividad: "Senderismo",
        imagen: "assets/imagenes/salto-la-china.webp",
        urlDetalle: "paginas/paginas extra/ruta-pucon.html"
    },
    {
        id: 7,
        nombre: "Termas de Huife",
        comuna: "Pucón",
        descripcion: "Relájate en aguas termales naturales rodeadas de bosque nativo.",
        dificultad: "Fácil",
        tipoActividad: "Cultura y Naturaleza",
        imagen: "assets/imagenes/termas-huife.webp"
    },
    {
        id: 8,
        nombre: "Ojos del Caburgua",
        comuna: "Pucón",
        descripcion: "Descubre estas pozas de agua cristalina escondidas entre bosque y roca volcánica.",
        dificultad: "Fácil",
        tipoActividad: "Senderismo",
        imagen: "assets/imagenes/ojos-caburgua.webp"
    },
    {
        id: 9,
        nombre: "Reserva Nacional Cañi",
        comuna: "Pucón",
        descripcion: "Recorre senderos entre araucarias milenarias en uno de los bosques nativos mejor conservados.",
        dificultad: "Difícil",
        tipoActividad: "Trekking",
        imagen: "assets/imagenes/reserva-cani.webp"
    },
    {
        id: 10,
        nombre: "Cañón del Río Trancura",
        comuna: "Pucón",
        descripcion: "Disfruta de rafting y paisajes de aguas turquesas en este cañón rodeado de naturaleza.",
        dificultad: "Media",
        tipoActividad: "Trekking",
        imagen: "assets/imagenes/canon-trancura.webp"
    },
    // ----------------------------------------------------------------------
    // RUTAS DE VILLARRICA
    // ----------------------------------------------------------------------
    {
        id: 11,
        nombre: "Costanera de Villarrica",
        comuna: "Villarrica",
        descripcion: "Camina junto al lago disfrutando de vistas panorámicas del volcán y los cerros cercanos.",
        dificultad: "Fácil",
        tipoActividad: "Senderismo",
        imagen: "assets/imagenes/costanera-villarrica.webp",
        urlDetalle: "paginas/paginas extra/ruta-villarrica.html"
    },
    {
        id: 12,
        nombre: "Museo Histórico y Arqueológico",
        comuna: "Villarrica",
        descripcion: "Conoce la cultura mapuche y la historia de la fundación de la ciudad.",
        dificultad: "Fácil",
        tipoActividad: "Cultura y Naturaleza",
        imagen: "assets/imagenes/museo-villarrica.webp"
    },
    {
        id: 13,
        nombre: "Feria Costumbrista Mapuche",
        comuna: "Villarrica",
        descripcion: "Descubre artesanía, gastronomía y tradiciones del pueblo mapuche.",
        dificultad: "Fácil",
        tipoActividad: "Cultura y Naturaleza",
        imagen: "assets/imagenes/feria-costumbrista.webp"
    },
    {
        id: 14,
        nombre: "Termas Geométricas",
        comuna: "Villarrica",
        descripcion: "Recorre pasarelas de madera entre pozas termales en un entorno natural único.",
        dificultad: "Media",
        tipoActividad: "Senderismo",
        imagen: "assets/imagenes/termas-geometricas.webp"
    },
    {
        id: 15,
        nombre: "Mirador Bellavista",
        comuna: "Villarrica",
        descripcion: "Disfruta de una vista panorámica completa del lago y el volcán desde las alturas.",
        dificultad: "Media",
        tipoActividad: "Senderismo",
        imagen: "assets/imagenes/mirador-villarrica.webp"
    }
];
export function obtenerRutaDelDia(listaRutas, comuna, fecha = new Date()) {
    // Filtrado de rutas pertenecientes a la comuna
    const rutasComuna = listaRutas.filter(r => r.comuna.toLocaleLowerCase() === comuna.toLocaleLowerCase());
    if (rutasComuna.length === 0)
        return null;
    const inicioAño = new Date(fecha.getFullYear(), 0, 0);
    const diferenciaTiempo = fecha.getTime() - inicioAño.getTime();
    const diaDelAño = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
    const indiceSeleccionado = diaDelAño % rutasComuna.length;
    return rutasComuna[indiceSeleccionado];
}
export function filtrarRutas(listaRutas, filtros) {
    return listaRutas.filter(ruta => {
        const coincideComuna = !filtros.comuna ||
            ruta.comuna.toLowerCase() === filtros.comuna.toLocaleLowerCase();
        const coincideDificultad = !filtros.dificultad ||
            ruta.dificultad.toLocaleLowerCase() === filtros.dificultad.toLocaleLowerCase();
        const coincideActividad = !filtros.tipoActividad ||
            ruta.tipoActividad.toLocaleLowerCase().includes(filtros.tipoActividad.toLocaleLowerCase());
        return coincideComuna && coincideDificultad && coincideActividad;
    });
}

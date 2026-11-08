import type { Ruta, FiltrosRuta } from '../types/ruta.ts';

/**
 * Normaliza textos para comparar sin distinguir mayúsculas ni tildes (Resuelve BUG-12).
 */
export function normalizarTexto(texto: string): string {
    return (texto || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

/**
 * Selección determinista de la ruta recomendada del día según el día del año (HU-10).
 */
export function obtenerRutaDelDia(listaRutas: Ruta[], comuna: string, fecha: Date = new Date()): Ruta | null {
    if (!listaRutas || listaRutas.length === 0) return null;

    const rutasComuna = listaRutas.filter(r =>
        normalizarTexto(r.comuna) === normalizarTexto(comuna)
    );

    if (rutasComuna.length === 0) return null;

    const diaDelAño = Math.floor(
        (Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()) -
         Date.UTC(fecha.getFullYear(), 0, 0)) / 86400000
    );

    const indiceSeleccionado = Math.abs(diaDelAño) % rutasComuna.length;
    return rutasComuna[indiceSeleccionado];
}

/**
 * Filtrado multicriterio por comuna, dificultad, actividad y horas máximas (HU-22).
 */
export function filtrarRutas(listaRutas: Ruta[], filtros: FiltrosRuta = {}): Ruta[] {
    if (!listaRutas) return [];

    return listaRutas.filter(ruta => {
        const coincideComuna = !filtros.comuna ||
            normalizarTexto(ruta.comuna) === normalizarTexto(filtros.comuna);

        const coincideDificultad = !filtros.dificultad ||
            normalizarTexto(ruta.dificultad) === normalizarTexto(filtros.dificultad);

        const coincideActividad = !filtros.tipoActividad ||
            normalizarTexto(ruta.tipoActividad).includes(normalizarTexto(filtros.tipoActividad));

        const coincideHoras = filtros.horasMax === undefined ||
            ruta.horasSenderismo === undefined ||
            ruta.horasSenderismo <= filtros.horasMax;

        return coincideComuna && coincideDificultad && coincideActividad && coincideHoras;
    });
}

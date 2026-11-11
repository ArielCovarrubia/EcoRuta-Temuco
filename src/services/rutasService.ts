import { rutas as rutasEstaticas } from '../../js/rutas.ts';
import type { Ruta } from '../types/ruta.ts';
import {
    obtenerRutasApi,
    obtenerRutaPorIdApi,
    enviarInscripcionApi,
    type ResultadoRutas
} from './rutasApi.ts';

/**
 * Retorna las rutas síncronas de respaldo para componentes existentes.
 */
export function obtenerRutas(): Ruta[] {
    return rutasEstaticas as unknown as Ruta[];
}

export {
    obtenerRutasApi,
    obtenerRutaPorIdApi,
    enviarInscripcionApi,
    type ResultadoRutas
};

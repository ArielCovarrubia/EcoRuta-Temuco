import { rutas } from '../../js/rutas';
import type { Ruta } from '../types/ruta';

export function obtenerRutas(): Ruta[] {
    return rutas;
}
import type { Ruta, FiltrosRuta, Inscripcion } from '../types/ruta.ts';
import { filtrarRutas } from '../utils/rutas.ts';

// URL base de la API: variable de entorno Vite o ruta relativa
const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || '';

/**
 * Validador estricto de tipos para asegurar que la respuesta cumpla el contrato Ruta (HU-23).
 */
export function esRutaValida(obj: any): obj is Ruta {
    if (!obj || typeof obj !== 'object') return false;

    const tieneCamposBasicos =
        typeof obj.id === 'number' &&
        typeof obj.nombre === 'string' &&
        typeof obj.comuna === 'string' &&
        typeof obj.imagen === 'string' &&
        (typeof obj.descripcionBreve === 'string' || typeof obj.descripcion === 'string') &&
        typeof obj.dificultad === 'string' &&
        typeof obj.tipoActividad === 'string';

    return Boolean(tieneCamposBasicos);
}

/**
 * Normaliza una ruta asegurando campos compatibles hacia atrás.
 */
function normalizarRuta(raw: any): Ruta {
    return {
        id: raw.id,
        nombre: raw.nombre,
        comuna: raw.comuna,
        imagen: raw.imagen,
        altImagen: raw.altImagen || `Imagen representativa de ${raw.nombre}`,
        descripcionBreve: raw.descripcionBreve || raw.descripcion || '',
        descripcionCompleta: raw.descripcionCompleta || raw.descripcion || raw.descripcionBreve || '',
        descripcion: raw.descripcion || raw.descripcionBreve || '',
        dificultad: raw.dificultad,
        tipoActividad: raw.tipoActividad,
        distanciaKm: typeof raw.distanciaKm === 'number' ? raw.distanciaKm : 0,
        horasSenderismo: typeof raw.horasSenderismo === 'number' ? raw.horasSenderismo : 0,
        fechaInicio: raw.fechaInicio || '',
        horaInicio: raw.horaInicio || '',
        ubicacionInicio: raw.ubicacionInicio || { nombre: raw.comuna, latitud: 0, longitud: 0 },
        ubicacionFin: raw.ubicacionFin || raw.ubicacionInicio || { nombre: raw.comuna, latitud: 0, longitud: 0 },
        atractivos: Array.isArray(raw.atractivos) ? raw.atractivos : [],
        estado: raw.estado || 'Publicado',
        puntajeSustentable: typeof raw.puntajeSustentable === 'number' ? raw.puntajeSustentable : 10,
        urlDetalle: raw.urlDetalle
    };
}

/**
 * Obtiene la lista de rutas desde la API propia o desde el respaldo JSON estático (RN-05).
 */
export async function obtenerRutasApi(filtros?: FiltrosRuta): Promise<Ruta[]> {
    const endpointsAIntentar = [
        'http://localhost:3001/api/v1/rutas',
        `${API_BASE_URL}/api/v1/rutas`,
        `${API_BASE_URL}/api/rutas`,
        '/api/v1/rutas',
        './api/rutas.json',
        '/api/rutas.json',
        'public/api/rutas.json'
    ];

    let rutasObtenidas: Ruta[] = [];
    let exito = false;

    for (const url of endpointsAIntentar) {
        try {
            // Construir query params si aplica y es endpoint de backend
            let urlFinal = url;
            if (filtros && (url.includes('/api/v1/rutas') || url.endsWith('/api/rutas'))) {
                const params = new URLSearchParams();
                if (filtros.comuna) params.append('comuna', filtros.comuna);
                if (filtros.dificultad) params.append('dificultad', filtros.dificultad);
                if (filtros.tipoActividad) params.append('tipoActividad', filtros.tipoActividad);
                if (filtros.horasMax !== undefined) params.append('horasMax', String(filtros.horasMax));
                const qs = params.toString();
                if (qs) urlFinal = `${url}?${qs}`;
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

            const response = await fetch(urlFinal, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                const listaRaw = Array.isArray(data) ? data : data.data || [];
                rutasObtenidas = listaRaw.filter(esRutaValida).map(normalizarRuta);
                exito = true;
                break;
            }
        } catch {
            // Intenta el siguiente endpoint (resiliencia y fallback RN-05)
            continue;
        }
    }

    if (!exito) {
        throw new Error('No fue posible cargar las rutas desde la API ni desde el respaldo local.');
    }

    // Filtrar solo las rutas en estado Publicado (RN-02 / HU-23)
    const soloPublicadas = rutasObtenidas.filter(r => r.estado === 'Publicado');

    // Aplicar filtros en el cliente para garantizar coherencia en modo Jamstack
    if (filtros) {
        return filtrarRutas(soloPublicadas, filtros);
    }

    return soloPublicadas;
}

/**
 * Obtiene una ruta por su ID desde la API o catálogo respaldado.
 */
export async function obtenerRutaPorIdApi(id: number): Promise<Ruta | null> {
    const endpoints = [
        `http://localhost:3001/api/v1/rutas/${id}`,
        `${API_BASE_URL}/api/v1/rutas/${id}`,
        `${API_BASE_URL}/api/rutas/${id}`,
        `/api/v1/rutas/${id}`
    ];

    for (const url of endpoints) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                if (esRutaValida(data)) {
                    return normalizarRuta(data);
                }
            }
        } catch {
            continue;
        }
    }

    // Fallback: buscar en la lista general
    const todas = await obtenerRutasApi();
    return todas.find(r => r.id === id) || null;
}

/**
 * Envía una inscripción a la API propia mediante POST /api/inscripciones (RN-08).
 */
export async function enviarInscripcionApi(
    inscripcion: Inscripcion
): Promise<{ id: number; mensaje: string; fechaRegistro: string }> {
    const endpoints = [
        'http://localhost:3001/api/v1/inscripciones',
        `${API_BASE_URL}/api/v1/inscripciones`,
        `${API_BASE_URL}/api/inscripciones`,
        '/api/v1/inscripciones'
    ];

    for (const url of endpoints) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inscripcion)
            });

            if (response.ok) {
                return await response.json();
            }

            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Error ${response.status} al procesar la inscripción`);
        } catch (err: any) {
            if (err.message && !err.message.includes('fetch')) {
                throw err;
            }
            continue;
        }
    }

    throw new Error('La API de inscripciones no está disponible actualmente. Inténtalo más tarde.');
}

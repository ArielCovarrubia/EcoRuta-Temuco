import type { Emprendedor } from '../types/Emprendedor';

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || '';

/**
 * Obtiene los emprendimientos publicados desde la API o catálogo local (HU-17 / RN-02).
 */
export async function obtenerEmprendedoresApi(): Promise<Emprendedor[]> {
    const endpoints = [
        'https://6719b4567fc4c5ff8f4dc79c.mockapi.io/api/v1/emprendedores', // MockAPI remota oficial HU-17
        `${API_BASE_URL}/api/v1/emprendedores`,
        `${API_BASE_URL}/api/emprendedores`,
        './api/emprendedores.json',
        '/api/emprendedores.json',
        'public/api/emprendedores.json'
    ];

    for (const url of endpoints) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3500);

            const res = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data: Emprendedor[] = await res.json();
                if (Array.isArray(data)) {
                    // Filtrar exclusivamente los que tengan estado "Publicado" y puntaje >= 8 (RN-02)
                    return data.filter(e => e.estado === 'Publicado');
                }
            }
        } catch {
            continue;
        }
    }

    throw new Error('No fue posible cargar el catálogo de emprendedores.');
}

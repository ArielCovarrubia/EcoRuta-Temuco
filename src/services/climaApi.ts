export interface DatosClima {
    ciudad: string;
    temperatura: number;
    sensacionTermica: number;
    viento: number;
    condicion: string;
    codigoWmo: number;
}

export const COORDENADAS_CIUDADES: Record<string, { nombre: string; lat: number; lon: number }> = {
    temuco: { nombre: 'Temuco', lat: -38.7397, lon: -72.5901 },
    pucon: { nombre: 'Pucón', lat: -39.2821, lon: -71.9754 },
    villarrica: { nombre: 'Villarrica', lat: -39.2858, lon: -72.2272 }
};

const CONDICIONES_WMO: Record<number, string> = {
    0: 'Despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Niebla',
    48: 'Niebla con escarcha',
    51: 'Llovizna ligera',
    53: 'Llovizna moderada',
    55: 'Llovizna intensa',
    61: 'Lluvia ligera',
    63: 'Lluvia moderada',
    65: 'Lluvia intensa',
    71: 'Nevada ligera',
    73: 'Nevada moderada',
    75: 'Nevada intensa',
    80: 'Chubascos ligeros',
    81: 'Chubascos moderados',
    82: 'Chubascos intensos',
    95: 'Tormenta eléctrica'
};

export function obtenerDescripcionClima(codigo: number): string {
    return CONDICIONES_WMO[codigo] || 'Condición desconocida';
}

/**
 * Consulta la API pública de Open-Meteo para obtener el tiempo actual (HU-04).
 */
export async function consultarClima(
    latitud: number,
    longitud: number,
    nombreLugar = 'Zona de la ruta'
): Promise<DatosClima> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=America%2FSantiago`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Error en API Open-Meteo: status ${res.status}`);
        }

        const data = await res.json();
        const current = data.current;

        return {
            ciudad: nombreLugar,
            temperatura: Math.round(current.temperature_2m),
            sensacionTermica: Math.round(current.apparent_temperature),
            viento: Math.round(current.wind_speed_10m),
            condicion: obtenerDescripcionClima(current.weather_code),
            codigoWmo: current.weather_code
        };
    } catch (err: any) {
        throw new Error('Clima temporalmente no disponible');
    }
}

/**
 * Consulta el clima por nombre de comuna (Temuco, Pucón, Villarrica).
 */
export async function consultarClimaPorComuna(comuna: string): Promise<DatosClima> {
    const key = (comuna || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const coord = COORDENADAS_CIUDADES[key] || COORDENADAS_CIUDADES.temuco;
    return consultarClima(coord.lat, coord.lon, coord.nombre);
}

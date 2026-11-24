interface CiudadClima {
    nombre: string;
    latitud: number;
    longitud: number;
}

// Coordenadas de cada ciudad
const ciudades: Record<string, CiudadClima> = {
    pucon: {
        nombre: "Pucón",
        latitud: -39.2821,
        longitud: -71.9754
    },

    temuco: {
        nombre: "Temuco",
        latitud: -38.7397,
        longitud: -72.5901
    },

    villarrica: {
        nombre: "Villarrica",
        latitud: -39.2858,
        longitud: -72.2272
    }
};

// Identificar la ciudad según el título de la página
function obtenerCiudad(): CiudadClima | null {
    const titulo = document.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    if (titulo.includes("pucon")) {
        return ciudades.pucon;
    }

    if (titulo.includes("temuco")) {
        return ciudades.temuco;
    }

    if (titulo.includes("villarrica")) {
        return ciudades.villarrica;
    }

    return null;
}

// Convertir el código meteorológico en una descripción
function obtenerDescripcionClima(codigo: number): string {
    const condiciones: Record<number, string> = {
        0: "Despejado",
        1: "Mayormente despejado",
        2: "Parcialmente nublado",
        3: "Nublado",

        45: "Niebla",
        48: "Niebla con escarcha",

        51: "Llovizna ligera",
        53: "Llovizna moderada",
        55: "Llovizna intensa",
        56: "Llovizna helada ligera",
        57: "Llovizna helada intensa",

        61: "Lluvia ligera",
        63: "Lluvia moderada",
        65: "Lluvia intensa",
        66: "Lluvia helada ligera",
        67: "Lluvia helada intensa",

        71: "Nevada ligera",
        73: "Nevada moderada",
        75: "Nevada intensa",
        77: "Granizo pequeño",

        80: "Chubascos ligeros",
        81: "Chubascos moderados",
        82: "Chubascos intensos",

        85: "Chubascos de nieve ligeros",
        86: "Chubascos de nieve intensos",

        95: "Tormenta eléctrica",
        96: "Tormenta con granizo ligero",
        99: "Tormenta con granizo intenso"
    };

    return (
        obtenerTraduccion(`weatherCodes.c${codigo}`) ||
        condiciones[codigo] ||
        obtenerTraduccion("weather.unknown") ||
        "Condición no identificada"
    );
}

// Estado de la consulta: se guarda para poder volver a dibujar las tarjetas
// cuando cambia el idioma, sin consultar de nuevo la API.
interface DatosClima {
    temperatura: number;
    humedad: number;
    sensacion: number;
    viento: number;
    codigo: number;
    hora: string;
}

type EstadoClima =
    | { tipo: "consultando" }
    | { tipo: "error" }
    | { tipo: "datos"; datos: DatosClima };

let estadoClima: EstadoClima = { tipo: "consultando" };

function textoClima(clave: string, respaldo: string): string {
    return obtenerTraduccion(clave) || respaldo;
}

// Dibuja el estado actual del clima en todas las tarjetas, en el idioma actual.
function renderizarClima(): void {
    document.querySelectorAll<HTMLElement>(".cartas-img .carta .info-clima").forEach(contenedor => {
        if (estadoClima.tipo === "consultando") {
            contenedor.textContent = textoClima("weather.loading", "Consultando clima...");
            return;
        }

        if (estadoClima.tipo === "error") {
            contenedor.textContent = textoClima("weather.unavailable", "Clima temporalmente no disponible");
            return;
        }

        const { temperatura, humedad, sensacion, viento, codigo, hora } = estadoClima.datos;

        const idioma = document.documentElement.lang === "en" ? "en-US" : "es-CL";
        const actualizacion = new Date(hora).toLocaleString(idioma, {
            dateStyle: "short",
            timeStyle: "short"
        });

        contenedor.innerHTML = `
            <h4>${textoClima("weather.title", "Información del clima")}</h4>
            <p><strong>${textoClima("weather.temperature", "Temperatura")}:</strong> ${temperatura} °C</p>
            <p><strong>${textoClima("weather.condition", "Condición")}:</strong> ${obtenerDescripcionClima(codigo)}</p>
            <p><strong>${textoClima("weather.feelsLike", "Sensación térmica")}:</strong> ${sensacion} °C</p>
            <p><strong>${textoClima("weather.humidity", "Humedad")}:</strong> ${humedad}%</p>
            <p><strong>${textoClima("weather.wind", "Viento")}:</strong> ${viento} km/h</p>
            <p><strong>${textoClima("weather.updated", "Última actualización")}:</strong> ${actualizacion}</p>
        `;
    });
}

// Consultar el clima de una ciudad
async function consultarClima(ciudad: CiudadClima): Promise<void> {
    const tarjetas = prepararTarjetasClima();

    // Evitar consultas si no existen tarjetas
    if (tarjetas.length === 0) {
        return;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${ciudad.latitud}&longitude=${ciudad.longitud}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=America%2FSantiago`;

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener el clima");
        }

        const datos = await respuesta.json() as {
            current: {
                temperature_2m: number;
                relative_humidity_2m: number;
                apparent_temperature: number;
                wind_speed_10m: number;
                weather_code: number;
                time: string;
            };
        };
        const clima = datos.current;

        estadoClima = {
            tipo: "datos",
            datos: {
                temperatura: clima.temperature_2m,
                humedad: clima.relative_humidity_2m,
                sensacion: clima.apparent_temperature,
                viento: clima.wind_speed_10m,
                codigo: clima.weather_code,
                hora: clima.time
            }
        };
    } catch (error) {
        console.error("Error al consultar el clima:", error);
        estadoClima = { tipo: "error" };
    }

    renderizarClima();
}

// Preparar las tarjetas para mostrar el clima
function prepararTarjetasClima() {
    const tarjetas = document.querySelectorAll(".cartas-img .carta");

    tarjetas.forEach((tarjeta) => {
        const contenedorClima = document.createElement("div");

        contenedorClima.classList.add("info-clima");

        tarjeta.appendChild(contenedorClima);
    });

    estadoClima = { tipo: "consultando" };
    renderizarClima();

    return tarjetas;
}

// Al cambiar de idioma, las tarjetas se vuelven a dibujar con el estado guardado.
document.addEventListener("idiomacambiado", renderizarClima);

// Iniciar consulta cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
    const ciudad = obtenerCiudad();

    if (ciudad) {
        consultarClima(ciudad);
    }
});

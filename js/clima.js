// Coordenadas de cada ciudad
const ciudades = {
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
function obtenerCiudad() {
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
function obtenerDescripcionClima(codigo) {
    const condiciones = {
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

    return condiciones[codigo] || "Condición no identificada";
}

// Consultar el clima de una ciudad
async function consultarClima(ciudad) {
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

        const datos = await respuesta.json();
        const clima = datos.current;

        const temperatura = clima.temperature_2m;
        const humedad = clima.relative_humidity_2m;
        const sensacion = clima.apparent_temperature;
        const viento = clima.wind_speed_10m;

        const descripcion = obtenerDescripcionClima(
            clima.weather_code
        );

        const actualizacion = new Date(clima.time).toLocaleString(
            "es-CL",
            {
                dateStyle: "short",
                timeStyle: "short"
            }
        );

        // Mostrar los mismos datos en todas las tarjetas
        tarjetas.forEach((tarjeta) => {
            const contenedorClima =
                tarjeta.querySelector(".info-clima");

            contenedorClima.innerHTML = `
                <h4>Información del clima</h4>
                <p><strong>Temperatura:</strong> ${temperatura} °C</p>
                <p><strong>Condición:</strong> ${descripcion}</p>
                <p><strong>Sensación térmica:</strong> ${sensacion} °C</p>
                <p><strong>Humedad:</strong> ${humedad}%</p>
                <p><strong>Viento:</strong> ${viento} km/h</p>
                <p><strong>Última actualización:</strong> ${actualizacion}</p>
            `;
        });

    } catch (error) {
        console.error("Error al consultar el clima:", error);

        tarjetas.forEach((tarjeta) => {
            const contenedorClima =
                tarjeta.querySelector(".info-clima");

            contenedorClima.textContent =
                "Clima temporalmente no disponible";
        });
    }
}

// Preparar las tarjetas para mostrar el clima
function prepararTarjetasClima() {
    const tarjetas = document.querySelectorAll(".cartas-img .carta");

    tarjetas.forEach((tarjeta) => {
        const contenedorClima = document.createElement("div");

        contenedorClima.classList.add("info-clima");
        contenedorClima.textContent = "Consultando clima...";

        tarjeta.appendChild(contenedorClima);
    });

    return tarjetas;
}

// Iniciar consulta cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
    const ciudad = obtenerCiudad();

    if (ciudad) {
        consultarClima(ciudad);
    }
});
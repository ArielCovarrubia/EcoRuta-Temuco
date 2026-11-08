import express from 'express';
import cors from 'cors';
import rutasRouter from './routes/rutas.js';
import inscripcionesRouter from './routes/inscripciones.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS permitiendo GitHub Pages y entornos locales de desarrollo
const origenesPermitidos = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:4173',
    'http://127.0.0.1:5500',
    'https://arielcovarrubia.github.io'
];

app.use(cors({
    origin: (origin, callback) => {
        // Permitir solicitudes sin origen (como curl o aplicaciones locales)
        if (!origin) return callback(null, true);
        if (origenesPermitidos.some(o => origin.startsWith(o)) || origin.includes('github.io')) {
            return callback(null, true);
        }
        return callback(null, true); // Permisivo en desarrollo para no bloquear pruebas
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Endpoints versionados (/api/v1/...) y alias directos (/api/...)
app.use('/api/v1/rutas', rutasRouter);
app.use('/api/rutas', rutasRouter);

app.use('/api/v1/inscripciones', inscripcionesRouter);
app.use('/api/inscripciones', inscripcionesRouter);

// Health check y documentación del backend
app.get('/api/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        servicio: 'EcoRuta-Temuco REST API',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (_req, res) => {
    res.status(200).json({
        mensaje: 'Bienvenido a la API REST de EcoRuta-Temuco',
        endpoints: {
            rutas: '/api/v1/rutas (GET, POST)',
            detalleRuta: '/api/v1/rutas/:id (GET)',
            inscripciones: '/api/v1/inscripciones (POST)',
            health: '/api/health (GET)'
        }
    });
});

// Manejador 404 para endpoints desconocidos
app.use((_req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado en EcoRuta API' });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`[EcoRuta API] Servidor activo escuchando en el puerto ${PORT}`);
        console.log(`[EcoRuta API] Endpoints listos en http://localhost:${PORT}/api/v1/rutas`);
    });
}

export default app;

import app from './dist/server.js';

const PORT = 3001;
const BASE = `http://127.0.0.1:${PORT}`;

async function request(path, options = {}) {
    const url = `${BASE}${path}`;
    const res = await fetch(url, options);
    let data;
    try {
        data = await res.json();
    } catch {
        data = null;
    }
    return { status: res.status, ok: res.ok, data };
}

async function run() {
    console.log('\n======================================================');
    console.log('   VERIFICADOR QA: ENDPOINTS DEL BACKEND (HU-23/HU-27)');
    console.log('======================================================\n');

    let total = 0;
    let pasadas = 0;

    async function test(nombre, fn) {
        total++;
        try {
            await fn();
            pasadas++;
            console.log(`  [PASÓ] ✓ ${nombre}`);
        } catch (err) {
            console.error(`  [FALLÓ] ✗ ${nombre}: ${err.message}`);
        }
    }

    // Iniciar servidor temporal para pruebas si no está corriendo
    let server;
    try {
        server = await new Promise((resolve, reject) => {
            const s = app.listen(PORT, '127.0.0.1', () => resolve(s));
            s.on('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    // Ya hay una instancia corriendo, nos conectamos a ella
                    resolve(null);
                } else {
                    reject(err);
                }
            });
        });
    } catch (err) {
        console.error('Error al iniciar servidor de prueba:', err);
        process.exit(1);
    }

    try {
        // 1. Health check
        await test('GET /api/health -> 200 OK', async () => {
            const res = await request('/api/health');
            if (res.status !== 200 || res.data?.status !== 'ok') {
                throw new Error(`Se esperaba status 200 con { status: "ok" }, se obtuvo ${res.status}`);
            }
        });

        // 2. GET /api/v1/rutas
        await test('GET /api/v1/rutas -> 200 OK (Listado de rutas publicadas)', async () => {
            const res = await request('/api/v1/rutas');
            if (res.status !== 200 || !Array.isArray(res.data) || res.data.length === 0) {
                throw new Error(`No se obtuvo la lista esperada. Status: ${res.status}`);
            }
            const noPublicadas = res.data.filter(r => r.estado !== 'Publicado');
            if (noPublicadas.length > 0) {
                throw new Error('El backend devolvió rutas no publicadas (viola RN-02)');
            }
        });

        // 3. GET /api/v1/rutas con filtros
        await test('GET /api/v1/rutas?comuna=pucon -> 200 OK (Filtrado por comuna)', async () => {
            const res = await request('/api/v1/rutas?comuna=pucon');
            if (res.status !== 200 || !Array.isArray(res.data)) {
                throw new Error(`Fallo en status: ${res.status}`);
            }
            res.data.forEach(r => {
                const c = r.comuna.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                if (c !== 'pucon') {
                    throw new Error(`Ruta ${r.nombre} no corresponde a Pucón`);
                }
            });
        });

        // 4. GET /api/v1/rutas/:id existente
        await test('GET /api/v1/rutas/1 -> 200 OK (Detalle de ruta Cerro Ñielol)', async () => {
            const res = await request('/api/v1/rutas/1');
            if (res.status !== 200 || res.data?.nombre !== 'Cerro Ñielol') {
                throw new Error(`Ruta 1 incorrecta. Obtenido: ${res.data?.nombre}`);
            }
        });

        // 5. GET /api/v1/rutas/:id inexistente (404)
        await test('GET /api/v1/rutas/9999 -> 404 Not Found (Control de errores)', async () => {
            const res = await request('/api/v1/rutas/9999');
            if (res.status !== 404 || !res.data?.error) {
                throw new Error(`Se esperaba 404 con error estructurado, se obtuvo ${res.status}`);
            }
        });

        // 6. POST /api/v1/inscripciones válida (201)
        await test('POST /api/v1/inscripciones -> 201 Created (Inscripción válida)', async () => {
            const res = await request('/api/v1/inscripciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rutaId: 1,
                    nombreCompleto: 'Ariel Covarrubia',
                    correo: 'ariel.qa@ecoruta.cl',
                    telefono: '+56 9 1234 5678',
                    cantidadPersonas: 2,
                    fechaSalida: '2026-11-25',
                    nivelExperiencia: 'Intermedio',
                    aceptaCondiciones: true
                })
            });
            if (res.status !== 201 || !res.data?.id || !res.data?.mensaje) {
                throw new Error(`Se esperaba 201 con id y mensaje, obtenido ${res.status}: ${JSON.stringify(res.data)}`);
            }
        });

        // 7. POST /api/v1/inscripciones incompleta (400)
        await test('POST /api/v1/inscripciones incompleta -> 400 Bad Request (Validación en servidor)', async () => {
            const res = await request('/api/v1/inscripciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rutaId: 1,
                    nombreCompleto: 'A', // Muy corto (< 3)
                    correo: 'correo-invalido',
                    cantidadPersonas: 0 // Inválido (< 1)
                })
            });
            if (res.status !== 400 || !res.data?.error || !Array.isArray(res.data?.errores)) {
                throw new Error(`Se esperaba 400 con lista de errores, obtenido ${res.status}`);
            }
        });

        // 8. GET /api/v1/inscripciones (403 Privacidad RN-08)
        await test('GET /api/v1/inscripciones -> 403 Forbidden (Privacidad estricta RN-08)', async () => {
            const res = await request('/api/v1/inscripciones');
            if (res.status !== 403) {
                throw new Error(`Vulnerabilidad de privacidad: se esperaba 403, se obtuvo ${res.status}`);
            }
        });

        console.log('\n------------------------------------------------------');
        console.log(`Resultado final: ${pasadas} de ${total} pruebas de API pasadas con éxito.`);
        console.log('======================================================\n');
        process.exit(total - pasadas > 0 ? 1 : 0);
    } finally {
        if (server) {
            server.close();
        }
    }
}

run().catch(err => {
    console.error('Error al ejecutar pruebas:', err);
    process.exit(1);
});

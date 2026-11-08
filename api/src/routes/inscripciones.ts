import { Router, Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Inscripcion, Ruta } from '../types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const INSCRIPCIONES_FILE = path.resolve(__dirname, '../../data/inscripciones.json');
const RUTAS_FILE = path.resolve(__dirname, '../../data/rutas.json');

const router = Router();

function leerInscripciones(): Inscripcion[] {
    try {
        if (!fs.existsSync(INSCRIPCIONES_FILE)) return [];
        const raw = fs.readFileSync(INSCRIPCIONES_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function guardarInscripciones(inscripciones: Inscripcion[]): boolean {
    try {
        fs.writeFileSync(INSCRIPCIONES_FILE, JSON.stringify(inscripciones, null, 2), 'utf-8');
        return true;
    } catch (err) {
        console.error('Error al guardar inscripciones:', err);
        return false;
    }
}

function buscarRuta(rutaId: number): Ruta | undefined {
    try {
        if (!fs.existsSync(RUTAS_FILE)) return undefined;
        const rutas: Ruta[] = JSON.parse(fs.readFileSync(RUTAS_FILE, 'utf-8'));
        return rutas.find(r => r.id === rutaId && r.estado === 'Publicado');
    } catch {
        return undefined;
    }
}

/**
 * POST /api/inscripciones (o /api/v1/inscripciones)
 * Registra una inscripción a una ruta validando los datos en el servidor (HU-27, RN-08).
 * REGLA DE SEGURIDAD RN-08: No existe GET público para este recurso por protección de datos.
 */
router.post('/', (req: Request, res: Response) => {
    try {
        const body = req.body;
        const errores: string[] = [];

        // 1. Validar rutaId
        const rutaId = Number(body.rutaId);
        if (isNaN(rutaId) || rutaId <= 0) {
            errores.push('Debes seleccionar una ruta válida.');
        } else {
            const rutaEncontrada = buscarRuta(rutaId);
            if (!rutaEncontrada) {
                errores.push(`La ruta con ID ${rutaId} no existe o no está disponible para inscripciones.`);
            }
        }

        // 2. Validar nombreCompleto (mínimo 3 caracteres, letras y espacios)
        const nombre = typeof body.nombreCompleto === 'string' ? body.nombreCompleto.trim() : '';
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/;
        if (!nombre || !regexNombre.test(nombre)) {
            errores.push('El nombre completo debe tener al menos 3 caracteres y contener solo letras y espacios.');
        }

        // 3. Validar correo electrónico (formato estándar HU-13)
        const correo = typeof body.correo === 'string' ? body.correo.trim().toLowerCase() : '';
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correo || !regexEmail.test(correo)) {
            errores.push('El correo electrónico ingresado no tiene un formato válido.');
        }

        // 4. Validar cantidad de personas (1 a 10 según HU-03)
        const cantidadPersonas = Number(body.cantidadPersonas);
        if (isNaN(cantidadPersonas) || cantidadPersonas < 1 || cantidadPersonas > 10) {
            errores.push('La cantidad de personas debe ser un número entre 1 y 10.');
        }

        // 5. Validar fechaSalida (no puede ser en el pasado)
        const fechaSalida = typeof body.fechaSalida === 'string' ? body.fechaSalida.trim() : '';
        if (!fechaSalida) {
            errores.push('La fecha de la salida es obligatoria.');
        } else {
            const fechaIngresada = new Date(fechaSalida);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            if (isNaN(fechaIngresada.getTime()) || fechaIngresada < hoy) {
                errores.push('La fecha de la salida no puede ser anterior al día de hoy.');
            }
        }

        // 6. Validar aceptación de condiciones
        if (body.aceptaCondiciones !== true && body.aceptaCondiciones !== 'true') {
            errores.push('Debes aceptar las condiciones y términos de participación responsable.');
        }

        if (errores.length > 0) {
            res.status(400).json({
                error: errores[0],
                errores
            });
            return;
        }

        const todas = leerInscripciones();
        const nuevoId = todas.reduce((max, i) => Math.max(max, i.id || 0), 0) + 1;
        const ruta = buscarRuta(rutaId);

        const nuevaInscripcion: Inscripcion = {
            id: nuevoId,
            rutaId,
            nombreRuta: ruta?.nombre || 'Ruta seleccionada',
            fechaSalida,
            nombreCompleto: nombre,
            correo,
            telefono: typeof body.telefono === 'string' ? body.telefono.trim() : undefined,
            cantidadPersonas,
            nivelExperiencia: body.nivelExperiencia || 'Intermedio',
            aceptaCondiciones: true,
            fechaRegistro: new Date().toISOString()
        };

        todas.push(nuevaInscripcion);
        guardarInscripciones(todas);

        res.status(201).json({
            id: nuevaInscripcion.id,
            mensaje: `¡Inscripción confirmada con éxito para ${nombre}!`,
            fechaRegistro: nuevaInscripcion.fechaRegistro,
            resumen: {
                ruta: nuevaInscripcion.nombreRuta,
                fecha: nuevaInscripcion.fechaSalida,
                personas: nuevaInscripcion.cantidadPersonas
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la inscripción.' });
    }
});

// AVISO DE PRIVACIDAD RN-08 si alguien intenta listar inscripciones
router.get('/', (_req: Request, res: Response) => {
    res.status(403).json({
        error: 'Acceso no permitido: el listado de inscripciones es privado según la regla RN-08.'
    });
});

export default router;

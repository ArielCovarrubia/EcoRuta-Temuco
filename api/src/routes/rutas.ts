import { Router, Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Ruta } from '../types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUTAS_FILE = path.resolve(__dirname, '../../data/rutas.json');

const router = Router();

function leerRutas(): Ruta[] {
    try {
        if (!fs.existsSync(RUTAS_FILE)) return [];
        const raw = fs.readFileSync(RUTAS_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch (err) {
        console.error('Error al leer rutas.json:', err);
        return [];
    }
}

function guardarRutas(rutas: Ruta[]): boolean {
    try {
        fs.writeFileSync(RUTAS_FILE, JSON.stringify(rutas, null, 2), 'utf-8');
        return true;
    } catch (err) {
        console.error('Error al guardar rutas.json:', err);
        return false;
    }
}

function normalizar(texto: string): string {
    return (texto || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

/**
 * GET /api/rutas (o /api/v1/rutas)
 * Retorna las rutas publicadas con soporte de filtros opcionales (HU-23, RN-02, RN-07)
 */
router.get('/', (req: Request, res: Response) => {
    try {
        const todas = leerRutas();
        // Solo rutas publicadas según RN-02
        let resultado = todas.filter(r => r.estado === 'Publicado');

        const { comuna, dificultad, tipoActividad, horasMax } = req.query;

        if (typeof comuna === 'string' && comuna.trim() !== '') {
            resultado = resultado.filter(r => normalizar(r.comuna) === normalizar(comuna));
        }

        if (typeof dificultad === 'string' && dificultad.trim() !== '') {
            resultado = resultado.filter(r => normalizar(r.dificultad) === normalizar(dificultad));
        }

        if (typeof tipoActividad === 'string' && tipoActividad.trim() !== '') {
            resultado = resultado.filter(r => normalizar(r.tipoActividad).includes(normalizar(tipoActividad)));
        }

        if (typeof horasMax === 'string') {
            const max = parseFloat(horasMax);
            if (!isNaN(max)) {
                resultado = resultado.filter(r => r.horasSenderismo <= max);
            }
        }

        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al obtener rutas' });
    }
});

/**
 * GET /api/rutas/:id
 * Retorna el detalle de una ruta específica o 404
 */
router.get('/:id', (req: Request, res: Response) => {
    try {
        const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: 'El ID de la ruta debe ser un número entero válido' });
            return;
        }

        const todas = leerRutas();
        const ruta = todas.find(r => r.id === id && r.estado === 'Publicado');

        if (!ruta) {
            res.status(404).json({ error: `No se encontró la ruta con ID ${id} o no está publicada` });
            return;
        }

        res.status(200).json(ruta);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al buscar la ruta' });
    }
});

/**
 * POST /api/rutas (Sprint 3 / HU-24)
 * Permite registrar nuevas propuestas de rutas, asignando estado 'Pendiente' para revisión del PO
 */
router.post('/', (req: Request, res: Response) => {
    try {
        const body = req.body;
        if (!body.nombre || !body.comuna || !body.dificultad) {
            res.status(400).json({ error: 'Faltan campos obligatorios: nombre, comuna, dificultad' });
            return;
        }

        const todas = leerRutas();
        const nuevoId = todas.reduce((max, r) => Math.max(max, r.id), 0) + 1;

        const nuevaRuta: Ruta = {
            id: nuevoId,
            nombre: String(body.nombre).trim(),
            comuna: body.comuna,
            imagen: body.imagen || 'assets/imagenes/araucania.webp',
            altImagen: body.altImagen || `Imagen de ${body.nombre}`,
            descripcionBreve: body.descripcionBreve || body.descripcion || '',
            descripcionCompleta: body.descripcionCompleta || body.descripcion || '',
            descripcion: body.descripcion || body.descripcionBreve || '',
            dificultad: body.dificultad,
            tipoActividad: body.tipoActividad || 'Senderismo',
            distanciaKm: Number(body.distanciaKm) || 0,
            horasSenderismo: Number(body.horasSenderismo) || 1,
            fechaInicio: body.fechaInicio || new Date().toISOString().split('T')[0],
            horaInicio: body.horaInicio || '09:00',
            ubicacionInicio: body.ubicacionInicio || { nombre: body.comuna, latitud: 0, longitud: 0 },
            ubicacionFin: body.ubicacionFin || body.ubicacionInicio || { nombre: body.comuna, latitud: 0, longitud: 0 },
            atractivos: Array.isArray(body.atractivos) ? body.atractivos : [],
            estado: 'Pendiente', // HU-24: queda pendiente para validación RN-02
            puntajeSustentable: Number(body.puntajeSustentable) || 0
        };

        todas.push(nuevaRuta);
        guardarRutas(todas);

        res.status(201).json({
            mensaje: 'Ruta enviada correctamente. Ha quedado con estado Pendiente de validación.',
            ruta: nuevaRuta
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar la ruta propuesta' });
    }
});

export default router;

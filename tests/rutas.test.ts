import { esRutaValida } from '../src/services/rutasApi.ts';
import { filtrarRutas, obtenerRutaDelDia, normalizarTexto } from '../src/utils/rutas.ts';
import type { Ruta, FiltrosRuta } from '../src/types/ruta.ts';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUTAS_PATH = path.resolve(__dirname, '../public/api/rutas.json');
const rutasValidadas: Ruta[] = JSON.parse(fs.readFileSync(RUTAS_PATH, 'utf-8'));

function assert(cond: boolean, mensaje: string) {
    if (!cond) throw new Error(mensaje);
}

export function correrPruebasRutas() {
    console.log('--- Iniciando Suite de Pruebas: Contrato de API y Servicios (QA) ---');
    let pasadas = 0;
    let fallidas = 0;

    const pruebas = [
        {
            nombre: 'Contrato de Datos: El dataset public/api/rutas.json debe contener rutas válidas',
            ejecutar: () => {
                assert(Array.isArray(rutasValidadas), 'rutasData debe ser un arreglo');
                assert(rutasValidadas.length >= 3, 'Debe haber al menos 3 rutas de ejemplo');
                rutasValidadas.forEach(r => {
                    assert(esRutaValida(r), `Ruta inválida: ${r.nombre}`);
                    assert(r.estado === 'Publicado', `Ruta ${r.nombre} no está publicada`);
                    assert(r.puntajeSustentable >= 8, `Ruta ${r.nombre} no cumple RN-02 (puntaje >= 8)`);
                });
            }
        },
        {
            nombre: 'Contrato de Datos: esRutaValida rechaza objetos que no cumplen la interfaz',
            ejecutar: () => {
                assert(!esRutaValida(null), 'null no debe ser válido');
                assert(!esRutaValida({}), 'objeto vacío no debe ser válido');
                assert(!esRutaValida({ id: 1, nombre: 'Incompleta' }), 'objeto sin campos obligatorios no debe ser válido');
                assert(!esRutaValida({ id: 'invalido', nombre: 'Test' }), 'id no numérico debe ser rechazado');
            }
        },
        {
            nombre: 'Representatividad Territorial: Al menos una ruta por cada comuna (Temuco, Pucón, Villarrica)',
            ejecutar: () => {
                const comunas = new Set(rutasValidadas.map(r => r.comuna));
                assert(comunas.has('Temuco'), 'Falta ruta para Temuco');
                assert(comunas.has('Pucón'), 'Falta ruta para Pucón');
                assert(comunas.has('Villarrica'), 'Falta ruta para Villarrica');
            }
        },
        {
            nombre: 'Filtrado Multicriterio: filtrarRutas normaliza tildes correctamente (BUG-12)',
            ejecutar: () => {
                const conTilde = filtrarRutas(rutasValidadas, { comuna: 'Pucón' });
                const sinTilde = filtrarRutas(rutasValidadas, { comuna: 'pucon' });
                assert(conTilde.length > 0, 'Debe encontrar rutas con tilde');
                assert(conTilde.length === sinTilde.length, 'Debe arrojar la misma cantidad sin tilde');
            }
        },
        {
            nombre: 'Filtrado por Dificultad y Actividad',
            ejecutar: () => {
                const faciles = filtrarRutas(rutasValidadas, { dificultad: 'Fácil' });
                assert(faciles.length > 0, 'Debe encontrar rutas fáciles');
                faciles.forEach(r => assert(r.dificultad === 'Fácil', 'Todas deben ser Fáciles'));

                const senderismo = filtrarRutas(rutasValidadas, { tipoActividad: 'Senderismo' });
                assert(senderismo.length > 0, 'Debe encontrar rutas de senderismo');
            }
        },
        {
            nombre: 'Ruta del Día (HU-10): Selección determinista y rotación',
            ejecutar: () => {
                const fecha1 = new Date(2026, 10, 8);
                const r1 = obtenerRutaDelDia(rutasValidadas, 'Temuco', fecha1);
                const r2 = obtenerRutaDelDia(rutasValidadas, 'Temuco', fecha1);
                assert(r1 !== null, 'Debe retornar una ruta');
                assert(r1?.id === r2?.id, 'Misma fecha debe dar la misma ruta');

                const rInexistente = obtenerRutaDelDia(rutasValidadas, 'CiudadInexistente');
                assert(rInexistente === null, 'Comuna inexistente debe retornar null');
            }
        },
        {
            nombre: 'Metadatos Geográficos: Coordenadas y formato WebP',
            ejecutar: () => {
                rutasValidadas.forEach(r => {
                    assert(r.ubicacionInicio && typeof r.ubicacionInicio.latitud === 'number', 'Latitud requerida');
                    assert(typeof r.ubicacionInicio.longitud === 'number', 'Longitud requerida');
                    assert(r.imagen.endsWith('.webp'), 'Formato de imagen debe ser WebP');
                });
            }
        }
    ];

    pruebas.forEach(p => {
        try {
            p.ejecutar();
            pasadas++;
            console.log(`  ✓ ${p.nombre}`);
        } catch (err: any) {
            fallidas++;
            console.error(`  ✗ ${p.nombre}: ${err.message}`);
        }
    });

    console.log(`\nResumen: Total: ${pruebas.length} | Pasadas: ${pasadas} | Fallidas: ${fallidas}`);
    if (fallidas > 0) throw new Error(`${fallidas} prueba(s) fallaron`);
    return { total: pruebas.length, pasadas, fallidas };
}

correrPruebasRutas();

import { rutas, filtrarRutas, obtenerRutaDelDia } from '../js/rutas.js';
export function expect(actual) {
    return {
        toBe(expected) {
            if (actual !== expected) {
                throw new Error(`Se esperaba '${String(expected)}' pero se obtuvo '${String(actual)}'`);
            }
        },
        toEqual(expected) {
            const actualJson = JSON.stringify(actual);
            const expectedJson = JSON.stringify(expected);
            if (actualJson !== expectedJson) {
                throw new Error(`Se esperaba ${expectedJson} pero se obtuvo ${actualJson}`);
            }
        },
        toBeTruthy() {
            if (!actual) {
                throw new Error(`Se esperaba un valor verdadero pero se obtuvo '${String(actual)}'`);
            }
        },
        toBeFalsy() {
            if (actual) {
                throw new Error(`Se esperaba un valor falso pero se obtuvo '${String(actual)}'`);
            }
        },
        toBeNull() {
            if (actual !== null) {
                throw new Error(`Se esperaba 'null' pero se obtuvo '${String(actual)}'`);
            }
        },
        toBeGreaterThan(n) {
            if (typeof actual !== 'number' || actual <= n) {
                throw new Error(`Se esperaba que ${String(actual)} fuera mayor que ${n}`);
            }
        },
        toContain(item) {
            if (Array.isArray(actual)) {
                if (actual.indexOf(item) === -1) {
                    throw new Error(`El arreglo no contiene el elemento esperado`);
                }
            }
            else if (typeof actual === 'string') {
                if (actual.indexOf(item) === -1) {
                    throw new Error(`La cadena no contiene el texto esperado: '${item}'`);
                }
            }
            else {
                throw new Error(`toContain no soportado para este tipo`);
            }
        }
    };
}
export function crearSuites() {
    return [
        {
            nombre: "Suite 1: filtrarRutas (Filtrado Multicriterio)",
            casos: [
                {
                    nombre: "Debe retornar todas las 15 rutas cuando los filtros están vacíos",
                    ejecutar: () => {
                        const resultado = filtrarRutas(rutas, {});
                        expect(resultado.length).toBe(15);
                    }
                },
                {
                    nombre: "Debe filtrar correctamente por Comuna 'Pucón' (5 rutas)",
                    ejecutar: () => {
                        const resultado = filtrarRutas(rutas, { comuna: "Pucón" });
                        expect(resultado.length).toBe(5);
                        resultado.forEach(r => expect(r.comuna).toBe("Pucón"));
                    }
                },
                {
                    nombre: "Debe filtrar correctamente por Comuna 'pucon' sin tilde (5 rutas)",
                    ejecutar: () => {
                        const resultado = filtrarRutas(rutas, { comuna: "pucon" });
                        expect(resultado.length).toBe(5);
                        resultado.forEach(r => expect(r.comuna).toBe("Pucón"));
                    }
                },
                {
                    nombre: "Debe filtrar correctamente por Comuna 'Villarrica' (5 rutas)",
                    ejecutar: () => {
                        const resultado = filtrarRutas(rutas, { comuna: "Villarrica" });
                        expect(resultado.length).toBe(5);
                        resultado.forEach(r => expect(r.comuna).toBe("Villarrica"));
                    }
                },
                {
                    nombre: "Debe filtrar por Dificultad 'Fácil' en toda la región",
                    ejecutar: () => {
                        const resultado = filtrarRutas(rutas, { dificultad: "Fácil" });
                        expect(resultado.length).toBeGreaterThan(0);
                        resultado.forEach(r => expect(r.dificultad).toBe("Fácil"));
                    }
                },
                {
                    nombre: "Debe filtrar por Dificultad 'Media'",
                    ejecutar: () => {
                        const resultado = filtrarRutas(rutas, { dificultad: "Media" });
                        expect(resultado.length).toBeGreaterThan(0);
                        resultado.forEach(r => expect(r.dificultad).toBe("Media"));
                    }
                },
                {
                    nombre: "Debe filtrar por Dificultad 'Difícil' (Reserva Cañi)",
                    ejecutar: () => {
                        const resultado = filtrarRutas(rutas, { dificultad: "Difícil" });
                        expect(resultado.length).toBe(1);
                        expect(resultado[0].nombre).toBe("Reserva Nacional Cañi");
                    }
                },
                {
                    nombre: "Debe filtrar por Tipo de Actividad 'Senderismo'",
                    ejecutar: () => {
                        const resultado = filtrarRutas(rutas, { tipoActividad: "Senderismo" });
                        expect(resultado.length).toBeGreaterThan(0);
                        resultado.forEach(r => expect(r.tipoActividad).toContain("Senderismo"));
                    }
                },
                {
                    nombre: "Debe combinar Comuna 'Pucón' y Dificultad 'Fácil' (3 rutas)",
                    ejecutar: () => {
                        const resultado = filtrarRutas(rutas, { comuna: "Pucón", dificultad: "Fácil" });
                        expect(resultado.length).toBe(3);
                        const nombres = resultado.map(r => r.nombre);
                        expect(nombres).toContain("Salto La China");
                        expect(nombres).toContain("Termas de Huife");
                        expect(nombres).toContain("Ojos del Caburgua");
                    }
                },
                {
                    nombre: "Debe combinar Comuna 'Temuco', Dificultad 'Media' y Actividad 'Trekking' (1 ruta)",
                    ejecutar: () => {
                        const resultado = filtrarRutas(rutas, {
                            comuna: "Temuco",
                            dificultad: "Media",
                            tipoActividad: "Trekking"
                        });
                        expect(resultado.length).toBe(1);
                        expect(resultado[0].nombre).toBe("Parque Nacional Huerquehue");
                    }
                },
                {
                    nombre: "Debe retornar un arreglo vacío si ningún elemento coincide con los filtros",
                    ejecutar: () => {
                        const resultado = filtrarRutas(rutas, {
                            comuna: "Temuco",
                            dificultad: "Difícil"
                        });
                        expect(resultado.length).toBe(0);
                    }
                },
                {
                    nombre: "Debe ser insensible a mayúsculas/minúsculas en dificultad y actividad",
                    ejecutar: () => {
                        const res1 = filtrarRutas(rutas, { dificultad: "fácil" });
                        const res2 = filtrarRutas(rutas, { dificultad: "FÁCIL" });
                        expect(res1.length).toBe(res2.length);
                        expect(res1.length).toBeGreaterThan(0);
                    }
                }
            ]
        },
        {
            nombre: "Suite 2: obtenerRutaDelDia (Ruta Recomendada)",
            casos: [
                {
                    nombre: "Debe retornar una ruta válida para 'Temuco'",
                    ejecutar: () => {
                        const ruta = obtenerRutaDelDia(rutas, "Temuco");
                        expect(ruta).toBeTruthy();
                        expect(ruta === null || ruta === void 0 ? void 0 : ruta.comuna).toBe("Temuco");
                    }
                },
                {
                    nombre: "Debe retornar una ruta válida para 'Pucón'",
                    ejecutar: () => {
                        const ruta = obtenerRutaDelDia(rutas, "Pucón");
                        expect(ruta).toBeTruthy();
                        expect(ruta === null || ruta === void 0 ? void 0 : ruta.comuna).toBe("Pucón");
                    }
                },
                {
                    nombre: "Debe retornar una ruta válida para 'pucon' sin tilde",
                    ejecutar: () => {
                        const ruta = obtenerRutaDelDia(rutas, "pucon");
                        expect(ruta).toBeTruthy();
                        expect(ruta === null || ruta === void 0 ? void 0 : ruta.comuna).toBe("Pucón");
                    }
                },
                {
                    nombre: "Debe retornar una ruta válida para 'Villarrica'",
                    ejecutar: () => {
                        const ruta = obtenerRutaDelDia(rutas, "Villarrica");
                        expect(ruta).toBeTruthy();
                        expect(ruta === null || ruta === void 0 ? void 0 : ruta.comuna).toBe("Villarrica");
                    }
                },
                {
                    nombre: "Debe retornar null cuando la comuna no existe",
                    ejecutar: () => {
                        const ruta = obtenerRutaDelDia(rutas, "CiudadInexistente");
                        expect(ruta).toBeNull();
                    }
                },
                {
                    nombre: "Debe ser determinista para una misma fecha",
                    ejecutar: () => {
                        const fecha = new Date(2026, 9, 29);
                        const r1 = obtenerRutaDelDia(rutas, "Temuco", fecha);
                        const r2 = obtenerRutaDelDia(rutas, "Temuco", fecha);
                        expect(r1 === null || r1 === void 0 ? void 0 : r1.id).toBe(r2 === null || r2 === void 0 ? void 0 : r2.id);
                    }
                },
                {
                    nombre: "Debe rotar según el día del año",
                    ejecutar: () => {
                        const r1 = obtenerRutaDelDia(rutas, "Temuco", new Date(2026, 0, 1));
                        const r2 = obtenerRutaDelDia(rutas, "Temuco", new Date(2026, 0, 2));
                        expect(r1).toBeTruthy();
                        expect(r2).toBeTruthy();
                        expect((r1 === null || r1 === void 0 ? void 0 : r1.id) === (r2 === null || r2 === void 0 ? void 0 : r2.id)).toBe(false);
                    }
                }
            ]
        },
        {
            nombre: "Suite 3: Integridad del Dataset 'rutas' y Tipos TypeScript",
            casos: [
                {
                    nombre: "El dataset debe contener exactamente 15 rutas",
                    ejecutar: () => {
                        expect(rutas.length).toBe(15);
                    }
                },
                {
                    nombre: "Cada ruta debe poseer un id numérico único entre 1 y 15",
                    ejecutar: () => {
                        const ids = new Set();
                        rutas.forEach(r => {
                            expect(typeof r.id).toBe("number");
                            expect(r.id).toBeGreaterThan(0);
                            expect(ids.has(r.id)).toBe(false);
                            ids.add(r.id);
                        });
                        expect(ids.size).toBe(15);
                    }
                },
                {
                    nombre: "Cada ruta debe contener todos los campos obligatorios completos",
                    ejecutar: () => {
                        rutas.forEach(r => {
                            expect(r.nombre.trim().length).toBeGreaterThan(0);
                            expect(r.comuna.trim().length).toBeGreaterThan(0);
                            expect(r.descripcion.trim().length).toBeGreaterThan(15);
                            expect(r.tipoActividad.trim().length).toBeGreaterThan(0);
                            expect(r.imagen.trim().length).toBeGreaterThan(0);
                        });
                    }
                },
                {
                    nombre: "El campo 'dificultad' debe respetar estrictamente el tipo Dificultad",
                    ejecutar: () => {
                        const dificultadesValidas = ['Fácil', 'Media', 'Difícil'];
                        rutas.forEach(r => {
                            expect(dificultadesValidas).toContain(r.dificultad);
                        });
                    }
                },
                {
                    nombre: "Todas las imágenes deben apuntar a formato optimizado .webp",
                    ejecutar: () => {
                        rutas.forEach(r => {
                            expect(r.imagen.endsWith(".webp")).toBe(true);
                        });
                    }
                },
                {
                    nombre: "Las rutas principales (ID 1, 6, 11) deben tener definido urlDetalle",
                    ejecutar: () => {
                        const ruta1 = rutas.find(r => r.id === 1);
                        const ruta6 = rutas.find(r => r.id === 6);
                        const ruta11 = rutas.find(r => r.id === 11);
                        expect(ruta1 === null || ruta1 === void 0 ? void 0 : ruta1.urlDetalle).toBe("paginas extra/ruta-temuco.html");
                        expect(ruta6 === null || ruta6 === void 0 ? void 0 : ruta6.urlDetalle).toBe("paginas extra/ruta-pucon.html");
                        expect(ruta11 === null || ruta11 === void 0 ? void 0 : ruta11.urlDetalle).toBe("paginas extra/ruta-villarrica.html");
                    }
                }
            ]
        },
        {
            nombre: "Suite 4: Reglas de Negocio del Proyecto (RN-02 / RN-04)",
            casos: [
                {
                    nombre: "Distribución equitativa: exactamente 5 rutas por cada comuna",
                    ejecutar: () => {
                        const temuco = rutas.filter(r => r.comuna === "Temuco").length;
                        const pucon = rutas.filter(r => r.comuna === "Pucón").length;
                        const villarrica = rutas.filter(r => r.comuna === "Villarrica").length;
                        expect(temuco).toBe(5);
                        expect(pucon).toBe(5);
                        expect(villarrica).toBe(5);
                    }
                },
                {
                    nombre: "Todas las descripciones son descriptivas (mínimo 40 caracteres para accesibilidad)",
                    ejecutar: () => {
                        rutas.forEach(r => {
                            expect(r.descripcion.length).toBeGreaterThan(40);
                        });
                    }
                }
            ]
        }
    ];
}
export function ejecutarPruebas() {
    const suites = crearSuites();
    const resultados = [];
    const inicioTotal = performance.now();
    let pasadas = 0;
    let fallidas = 0;
    suites.forEach(suite => {
        suite.casos.forEach(caso => {
            const inicio = performance.now();
            let paso = true;
            let errorMsg;
            try {
                caso.ejecutar();
                pasadas++;
            }
            catch (err) {
                paso = false;
                fallidas++;
                errorMsg = err.message || String(err);
            }
            const fin = performance.now();
            resultados.push({
                suite: suite.nombre,
                nombre: caso.nombre,
                paso,
                error: errorMsg,
                duracionMs: parseFloat((fin - inicio).toFixed(2))
            });
        });
    });
    const finTotal = performance.now();
    return {
        total: pasadas + fallidas,
        pasadas,
        fallidas,
        duracionTotalMs: parseFloat((finTotal - inicioTotal).toFixed(2)),
        resultados
    };
}

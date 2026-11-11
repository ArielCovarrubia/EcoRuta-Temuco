import React, { useState, useEffect } from 'react';
import { enviarInscripcionApi } from '../services/rutasApi.ts';
import type { Inscripcion, Ruta } from '../types/ruta.ts';

export interface FormularioInscripcionProps {
    rutas?: Ruta[];
    rutaIdInicial?: number;
    rutaPredeterminada?: string;
    dificultadRuta?: string;
    rutaId?: number | string;
    origen?: 'api' | 'respaldo' | null;
}

export const FormularioInscripcion: React.FC<FormularioInscripcionProps> = ({
    rutas = [],
    rutaIdInicial,
    rutaPredeterminada = '',
    dificultadRuta = '',
    rutaId: propRutaId,
    origen = null
}) => {
    // 1. Estados
    const idPorDefecto = rutaIdInicial ?? (propRutaId ? Number(propRutaId) : (rutas[0]?.id ?? 1));
    const [rutaId, setRutaId] = useState<number>(idPorDefecto);
    const [nombre, setNombre] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [cupos, setCupos] = useState<number>(1);
    const [fechaSalida, setFechaSalida] = useState<string>('');
    const [nivelExperiencia, setNivelExperiencia] = useState<string>('Principiante');
    const [aceptaTerminos, setAceptaTerminos] = useState<boolean>(false);

    // Sincronizar rutaId si cargan rutas asíncronamente
    useEffect(() => {
        if (rutas.length > 0 && (!rutaId || !rutas.some(r => r.id === rutaId))) {
            setRutaId(rutaIdInicial ?? rutas[0].id);
        }
    }, [rutas, rutaIdInicial]);

    // Ruta activa para calcular advertencias y metadatos
    const rutaActual = rutas.find(r => r.id === rutaId);

    // Estados UI
    const [errores, setErrores] = useState<{ [key: string]: string }>({});
    const [mensajeExito, setMensajeExito] = useState<string>('');
    const [cargando, setCargando] = useState<boolean>(false);

    // 2. Advertencia condicional de seguridad basada en la ruta seleccionada (RN-04)
    const mostrarAdvertenciaSeguridad =
        nivelExperiencia === 'Principiante' &&
        (rutaActual?.dificultad === 'Difícil' || (!rutaActual && dificultadRuta === 'Difícil'));

    const fechaMinima = new Date().toISOString().split('T')[0];

    const validarFormulario = (): boolean => {
        const nuevosErrores: { [key: string]: string } = {};
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nombre.trim()) nuevosErrores.nombre = 'El nombre completo es obligatorio.';
        if (!email.trim() || !regexEmail.test(email)) nuevosErrores.email = 'Ingresa un correo electrónico válido.';
        if (!fechaSalida) nuevosErrores.fechaSalida = 'Selecciona una fecha de salida.';
        if (cupos < 1 || cupos > 5) nuevosErrores.cupos = 'Los cupos deben ser entre 1 y 5.';
        if (!aceptaTerminos) nuevosErrores.aceptaTerminos = 'Debes aceptar los términos y condiciones.';

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    // 3. Solicitud HTTP POST /api/v1/inscripciones (HU-27 / RN-08)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMensajeExito('');

        if (origen === 'respaldo') {
            setErrores({ general: 'El servicio de inscripciones no está disponible sin conexión al backend.' });
            return;
        }

        if (!validarFormulario()) return;

        setCargando(true);
        const cargaUtil: Inscripcion = {
            rutaId,
            nombreCompleto: nombre.trim(),
            correo: email.trim(),
            telefono: telefono.trim() || undefined,
            cantidadPersonas: cupos,
            fechaSalida,
            nivelExperiencia: nivelExperiencia as Inscripcion['nivelExperiencia'],
            aceptaCondiciones: aceptaTerminos
        };

        try {
            const respuesta = await enviarInscripcionApi(cargaUtil);
            setMensajeExito(`¡Gracias, ${nombre}! Tu inscripción #${respuesta.id} para ${cupos} cupo(s) en ${rutaActual?.nombre || 'la ruta'} ha sido registrada exitosamente.`);
            setNombre('');
            setEmail('');
            setTelefono('');
            setCupos(1);
            setFechaSalida('');
            setNivelExperiencia('Principiante');
            setAceptaTerminos(false);
            setErrores({});
        } catch (err: any) {
            setErrores({ general: err.message || 'Ocurrió un error al procesar la inscripción. Inténtalo nuevamente.' });
        } finally {
            setCargando(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="tarjeta-formulario" noValidate style={{ marginTop: '1.5rem' }}>
            <h3>Inscribirse en una ruta</h3>

            {origen === 'respaldo' && (
                <div className="aviso-modo-respaldo" role="status">
                    ℹ️ <strong>Modo sin conexión al servidor:</strong> El backend de inscripciones no está disponible actualmente. Puedes explorar las rutas en modo local.
                </div>
            )}

            {errores.general && (
                <div className="mensaje-error" role="alert">
                    {errores.general}
                </div>
            )}

            <div className="campo-grupo">
                <label htmlFor="ins-ruta">Selección de Ruta *</label>
                {rutas && rutas.length > 0 ? (
                    <select
                        id="ins-ruta"
                        value={rutaId}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRutaId(Number(e.target.value))}
                    >
                        {rutas.map(r => (
                            <option key={r.id} value={r.id}>
                                {r.nombre} ({r.comuna}) — Dificultad: {r.dificultad}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        id="ins-ruta"
                        value={rutaPredeterminada || 'Cargando rutas...'}
                        readOnly
                    />
                )}
            </div>

            <div className="campo-grupo">
                <label htmlFor="ins-nombre">Nombre completo *</label>
                <input
                    type="text"
                    id="ins-nombre"
                    value={nombre}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
                    placeholder="Ej: Carlos Pérez"
                    className={errores.nombre ? 'invalido' : ''}
                />
                {errores.nombre && <span className="mensaje-error" role="alert">{errores.nombre}</span>}
            </div>

            <div className="campo-grupo">
                <label htmlFor="ins-email">Correo electrónico *</label>
                <input
                    type="email"
                    id="ins-email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className={errores.email ? 'invalido' : ''}
                />
                {errores.email && <span className="mensaje-error" role="alert">{errores.email}</span>}
            </div>

            <div className="campo-grupo">
                <label htmlFor="ins-telefono">Teléfono (opcional)</label>
                <input
                    type="tel"
                    id="ins-telefono"
                    value={telefono}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelefono(e.target.value)}
                    placeholder="+56 9 1234 5678"
                />
            </div>

            <div className="campo-grupo">
                <label htmlFor="ins-fecha">Fecha de salida *</label>
                <input
                    type="date"
                    id="ins-fecha"
                    min={fechaMinima}
                    value={fechaSalida}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFechaSalida(e.target.value)}
                    className={errores.fechaSalida ? 'invalido' : ''}
                />
                {errores.fechaSalida && <span className="mensaje-error" role="alert">{errores.fechaSalida}</span>}
            </div>

            <div className="campo-grupo">
                <label htmlFor="ins-experiencia">Nivel de experiencia *</label>
                <select
                    id="ins-experiencia"
                    value={nivelExperiencia}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNivelExperiencia(e.target.value)}
                >
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                </select>
            </div>

            {mostrarAdvertenciaSeguridad && (
                <div
                    className="aviso-medico"
                    style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '10px', borderRadius: '6px', marginBottom: '1rem' }}
                    role="alert"
                >
                    <strong>Advertencia de Seguridad:</strong> La ruta "{rutaActual?.nombre || 'seleccionada'}" es de alta dificultad y no se recomienda para nivel principiante sin un guía certificado.
                </div>
            )}

            <div className="campo-grupo">
                <label htmlFor="ins-cupos">Número de cupos (1 a 5) *</label>
                <input
                    type="number"
                    id="ins-cupos"
                    min="1"
                    max="5"
                    value={cupos}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCupos(parseInt(e.target.value, 10) || 1)}
                    className={errores.cupos ? 'invalido' : ''}
                />
                {errores.cupos && <span className="mensaje-error" role="alert">{errores.cupos}</span>}
            </div>

            <div className="campo-grupo" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <input
                    type="checkbox"
                    id="ins-terminos"
                    checked={aceptaTerminos}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAceptaTerminos(e.target.checked)}
                />
                <label htmlFor="ins-terminos" style={{ marginBottom: 0 }}>
                    Acepto los términos y condiciones de la ruta *
                </label>
            </div>
            {errores.aceptaTerminos && <span className="mensaje-error" role="alert">{errores.aceptaTerminos}</span>}

            <button
                type="submit"
                className="btn-submit"
                disabled={cargando || origen === 'respaldo'}
                style={{ marginTop: '1rem' }}
                title={origen === 'respaldo' ? 'Inscripciones no disponibles en modo respaldo local' : undefined}
            >
                {cargando ? 'Enviando...' : origen === 'respaldo' ? 'Inscripciones no disponibles sin API' : 'Confirmar Inscripción'}
            </button>

            {mensajeExito && (
                <p className="mensaje-exito" role="status" aria-live="polite" style={{ marginTop: '1rem' }}>
                    {mensajeExito}
                </p>
            )}
        </form>
    );
};
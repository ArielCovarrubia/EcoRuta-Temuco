export type Comuna = 'Temuco' | 'Pucón' | 'Villarrica';
export type Dificultad = 'Fácil' | 'Media' | 'Difícil';
export type TipoActividad =
    | 'Senderismo'
    | 'Trekking'
    | 'Cultura y Patrimonio'
    | 'Termas'
    | 'Deportes acuáticos'
    | string;

export type EstadoPublicacion = 'Publicado' | 'Pendiente' | 'Rechazado';

export interface Ubicacion {
    nombre: string;
    latitud: number;
    longitud: number;
}

export interface Ruta {
    id: number;
    nombre: string;
    comuna: Comuna | string;
    imagen: string;
    altImagen?: string;
    descripcionBreve: string;
    descripcionCompleta: string;
    descripcion?: string; // Compatibilidad hacia atrás con componentes existentes
    dificultad: Dificultad;
    tipoActividad: TipoActividad;
    distanciaKm: number;
    horasSenderismo: number;
    fechaInicio: string;
    horaInicio: string;
    ubicacionInicio: Ubicacion;
    ubicacionFin: Ubicacion;
    atractivos: string[];
    estado: EstadoPublicacion;
    puntajeSustentable: number;
    urlDetalle?: string;
}

export interface FiltrosRuta {
    comuna?: string;
    dificultad?: string;
    tipoActividad?: string;
    horasMax?: number;
}

export interface Inscripcion {
    id?: number;
    rutaId: number;
    nombreRuta?: string;
    fechaSalida: string;
    nombreCompleto: string;
    correo: string;
    telefono?: string;
    cantidadPersonas: number;
    nivelExperiencia?: 'Principiante' | 'Intermedio' | 'Avanzado';
    aceptaCondiciones: boolean;
    fechaRegistro?: string;
}
export * from './ruta';

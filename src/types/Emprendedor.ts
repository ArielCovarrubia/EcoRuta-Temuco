export type EstadoEmprendedor = 'Publicado' | 'Pendiente' | 'Inactivo' | 'Rechazado';

export interface Emprendedor {
    id: number;
    nombre: string;
    descripcion: string;
    rubro?: string;
    comuna?: string;
    ubicacion: string;
    whatsapp: string;
    redesSociales?: string;
    puntajeSustentable: number; // Escala de 0 a 12 según RN-02
    estado: EstadoEmprendedor;
}

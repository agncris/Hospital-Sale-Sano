// Interface para representar un Paciente
export interface Paciente {
    id: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    genero: 'masculino' | 'femenino' | 'otro';
    direccion: string;
    telefono: string;
    email: string;
}

// Interface para representar un Doctor
export interface Doctor {
    id: string;
    nombre: string;
    especialidad: string;
    descripcion: string;
    experiencia: number;
    contacto: {
        telefono: string;
        email: string;
    };
    disponibilidad: Record<string, string>;
    consultas: Consulta[];
    imagen: string;
}

// Interface para representar una Consulta
export interface Consulta {
    dia: string;
    horas: number;
}

// Interface para representar un Usuario
export interface User {
    username: string;
    email: string;
    role: 'admin' | 'doctor' | 'staff';
    permissions: string[];
}

// Interface para representar una Cita Médica
export interface CitaMedica {
    id: number;
    pacienteId: number;
    doctorId: number;
    fecha: Date;
    hora: string;
    motivo: string;
}

// Interface para representar un Hospital
export interface Hospital {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
}
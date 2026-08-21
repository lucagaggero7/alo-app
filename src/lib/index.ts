// src/lib/types/index.ts
export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: 'usuario' | 'administrador' | 'medico';
  activo: boolean;
  creado: string;
  actualizado: string | null;
}

export interface Especialidad {
  id: string;
  nombre: string;
  descripcion: string | null;
  creado: string;
  actualizado: string | null;
}

export interface Medico {
  id: string;
  usuario_id: string;
  especialidad_id: string;
  matricula: string;
  activo: boolean;
  creado: string;
  actualizado: string | null;
  usuario?: Usuario;
  especialidad?: Especialidad;
}

export interface Turno {
  id: string;
  paciente_id: string;
  medico_id: string;
  fecha_hora: string;
  estado: 'pendiente' | 'confirmado' | 'cancelado' | 'completado';
  motivo: string | null;
  notas: string | null;
  creado: string;
  actualizado: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: 'usuario' | 'administrador' | 'medico';
}
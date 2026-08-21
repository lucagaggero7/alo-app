// src/lib/api/auth.ts
import api from './client';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  Usuario,
} from '..';

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/usuarios/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<Usuario> => {
    const response = await api.post('/usuarios/registro', data);
    return response.data;
  },

  getProfile: async (): Promise<Usuario> => {
    const response = await api.get('/usuarios/perfil');
    return response.data;
  },
};
// src/lib/hooks/useAuth.ts
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../api/auth';
import { Usuario } from '..';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const userData = await authApi.getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Error al obtener perfil:', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const isAdmin = user?.rol === 'administrador';
  const isMedico = user?.rol === 'medico';
  const isUsuario = user?.rol === 'usuario';

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return {
    user,
    loading,
    isAdmin,
    isMedico,
    isUsuario,
    logout,
  };
}
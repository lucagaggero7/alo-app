// src/app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { authApi } from '../../../lib/api/auth';

import Cookies from 'js-cookie';


const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(data);
      
      
      Cookies.set('token', response.access_token, {
  expires: 1, // días
  sameSite: 'lax',
});
localStorage.setItem('token', response.access_token);
      
      // Obtener perfil del usuario (opcional)
      try {
        const user = await authApi.getProfile();
        console.log('Usuario logueado:', user);
      } catch (profileError) {
        console.error('Error al obtener perfil:', profileError);
      }
      
      toast.success('✅ ¡Bienvenido!');
      
      // Redirigir al dashboard
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error de login:', error);
      
      // Manejar errores específicos
      if (error.response) {
        // El servidor respondió con un error
        const status = error.response.status;
        const detail = error.response.data?.detail;
        
        if (status === 401) {
          toast.error('❌ Email o contraseña incorrectos');
        } else if (status === 404) {
          toast.error('❌ Usuario no encontrado');
        } else if (status === 409) {
          toast.error('❌ Usuario desactivado');
        } else {
          toast.error(detail || '❌ Error al iniciar sesión');
        }
      } else if (error.request) {
        // La petición se hizo pero no hubo respuesta
        toast.error('❌ No se pudo conectar con el servidor. ¿El backend está corriendo?');
      } else {
        // Otro error
        toast.error('❌ Error al iniciar sesión');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sistema de Turnos Médicos
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="ejemplo@email.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Iniciar Sesión
          </Button>

          <div className="text-center">
            <Link href="/register" className="text-sm text-blue-600 hover:text-blue-500">
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
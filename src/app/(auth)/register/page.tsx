// src/app/(auth)/register/page.tsx
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

const registerSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellido: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await authApi.register({
        ...data,
        rol: 'usuario', // Siempre se registra como usuario
      });
      
      toast.success('✅ ¡Registro exitoso! Ahora inicia sesión');
      
      // Redirigir al login después de 1.5 segundos
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      
    } catch (error: any) {
      console.error('Error de registro:', error);
      
      if (error.response) {
        const status = error.response.status;
        const detail = error.response.data?.detail;
        
        if (status === 409) {
          toast.error('❌ El email ya está registrado');
        } else if (status === 400) {
          toast.error(detail || '❌ Datos inválidos');
        } else {
          toast.error(detail || '❌ Error al registrarse');
        }
      } else if (error.request) {
        toast.error('❌ No se pudo conectar con el servidor. ¿El backend está corriendo?');
      } else {
        toast.error('❌ Error al registrarse');
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
            Crear Cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Regístrate en el Sistema de Turnos Médicos
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Nombre"
              type="text"
              placeholder="Juan"
              error={errors.nombre?.message}
              {...register('nombre')}
            />
            <Input
              label="Apellido"
              type="text"
              placeholder="Pérez"
              error={errors.apellido?.message}
              {...register('apellido')}
            />
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
            Registrarse
          </Button>

          <div className="text-center">
            <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </form>

        <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-sm text-blue-700 text-center">
            🔒 <strong>¿Eres médico o administrador?</strong>
            <br />
            Regístrate como usuario y contacta al administrador del sistema para asignar tu rol.
          </p>
        </div>
      </div>
    </div>
  );
}
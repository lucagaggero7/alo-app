// src/components/layouts/Sidebar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import {
  LayoutDashboard,
  Calendar,
  Stethoscope,
  Users,
  Activity,
  LogOut,
  Shield,
} from 'lucide-react';

export function Sidebar() {
  const { user, isAdmin, logout } = useAuth();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600" />
            Turnos Médicos
          </h1>
          {user && (
            <p className="text-sm text-gray-500 mt-1">
              {user.nombre} {user.apellido}
              <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
                {user.rol === 'administrador' && '👑 Admin'}
                {user.rol === 'medico' && '👨‍⚕️ Médico'}
                {user.rol === 'usuario' && '👤 Usuario'}
              </span>
            </p>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            href="/turnos"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <Calendar size={20} />
            Turnos
          </Link>

          {/* 🔒 Solo médicos y admins ven "Pacientes" */}
          {(isAdmin || user?.rol === 'medico') && (
            <Link
              href="/pacientes"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <Users size={20} />
              Pacientes
            </Link>
          )}

          {/* 🔒 Solo admins ven "Médicos" y "Especialidades" */}
          {isAdmin && (
            <>
              <Link
                href="/medicos"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
              >
                <Stethoscope size={20} />
                Médicos
              </Link>
              <Link
                href="/especialidades"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
              >
                <Shield size={20} />
                Especialidades
              </Link>
            </>
          )}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 w-full transition-colors"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
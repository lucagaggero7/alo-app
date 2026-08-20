// src/app/(dashboard)/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, Calendar, Stethoscope, LogOut, Activity } from 'lucide-react';

// ✅ COMPONENTE PRINCIPAL
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Activity className="h-6 w-6 text-blue-600" />
              Turnos Médicos
            </h1>
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
            <Link
              href="/medicos"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <Stethoscope size={20} />
              Médicos
            </Link>
            <Link
              href="/pacientes"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <Users size={20} />
              Pacientes
            </Link>
            <Link
              href="/especialidades"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <Activity size={20} />
              Especialidades
            </Link>
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 w-full transition-colors"
            >
              <LogOut size={20} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 p-8">{children}</div>
    </div>
  );
}
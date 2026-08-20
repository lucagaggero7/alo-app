
// src/app/(dashboard)/dashboard/page.tsx
'use client';

// ✅ COMPONENTE PRINCIPAL
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Turnos</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-yellow-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Pendientes</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Confirmados</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Completados</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">0</p>
        </div>
      </div>
    </div>
  );
}
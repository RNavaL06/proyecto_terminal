import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, MapPin, Mic, DollarSign } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
      <h1 className="text-4xl font-bold text-slate-800">Bienvenido al Sistema Médico BDI</h1>
      <p className="text-lg text-slate-500 max-w-2xl">
        Selecciona un módulo en la barra de navegación para comenzar.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 w-full max-w-5xl">
        <Link to="/escaner" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col items-center gap-4">
          <div className="bg-blue-50 p-4 rounded-full text-blue-500"><Camera size={32} /></div>
          <h2 className="text-xl font-semibold">Captura de Recetas</h2>
        </Link>
        <Link to="/farmacias" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col items-center gap-4">
          <div className="bg-green-50 p-4 rounded-full text-green-500"><MapPin size={32} /></div>
          <h2 className="text-xl font-semibold">Búsqueda de Farmacias</h2>
        </Link>
        <Link to="/voz" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col items-center gap-4">
          <div className="bg-purple-50 p-4 rounded-full text-purple-500"><Mic size={32} /></div>
          <h2 className="text-xl font-semibold">Captura por Voz</h2>
        </Link>
        <Link to="/precios" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col items-center gap-4">
          <div className="bg-emerald-50 p-4 rounded-full text-emerald-500"><DollarSign size={32} /></div>
          <h2 className="text-xl font-semibold">Comparador Precios</h2>
        </Link>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, MapPin, Mic, DollarSign, Pill, User, LogOut } from 'lucide-react';

export default function HomePage({ onLogout }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans px-4 pt-12 pb-24 md:p-8">
      
      {/* Header Soft UI */}
      <div className="flex justify-between items-center mb-10 w-full max-w-5xl mx-auto">
        <div>
          <p className="text-sm font-medium text-slate-500">¡Hola!</p>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Usuario</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onLogout}
            className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 hover:bg-rose-100 transition-colors shadow-sm"
            title="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
          
          {/* Avatar Circular */}
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden shadow-sm">
            <User className="text-blue-500 w-7 h-7" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <h2 className="text-slate-800 font-bold text-xl mb-6 ml-1">¿Qué deseas hacer hoy?</h2>

        {/* Tarjetas Principales (Estilo Soft UI) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <Link to="/botiquin" className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between aspect-square">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
              <Pill className="text-blue-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Control</p>
              <h3 className="text-slate-800 font-bold text-lg leading-tight">Mi<br/>Botiquín</h3>
            </div>
          </Link>

          <Link to="/escaner" className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between aspect-square">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
              <Camera className="text-blue-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Captura</p>
              <h3 className="text-slate-800 font-bold text-lg leading-tight">Escanear<br/>Receta</h3>
            </div>
          </Link>

          <Link to="/farmacias" className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between aspect-square">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
              <MapPin className="text-blue-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Buscar</p>
              <h3 className="text-slate-800 font-bold text-lg leading-tight">Mapa de<br/>Farmacias</h3>
            </div>
          </Link>

          <Link to="/voz" className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between aspect-square">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
              <Mic className="text-blue-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Síntomas</p>
              <h3 className="text-slate-800 font-bold text-lg leading-tight">Me siento<br/>Mal</h3>
            </div>
          </Link>
          
          <Link to="/precios" className="col-span-2 lg:col-span-4 bg-white p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between mt-2">
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Ahorro</p>
              <h3 className="text-slate-800 font-bold text-lg leading-tight">Comparador de Precios</h3>
            </div>
            <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center">
              <DollarSign className="text-blue-500 w-7 h-7" />
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}

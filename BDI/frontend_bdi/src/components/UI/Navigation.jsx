import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
              <Home size={24} />
              BDI Medical
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link to="/escaner" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Escaner Recetas
              </Link>
              <Link to="/farmacias" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Farmacias
              </Link>
              <Link to="/voz" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Captura Voz
              </Link>
              <Link to="/precios" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300">
                Precios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

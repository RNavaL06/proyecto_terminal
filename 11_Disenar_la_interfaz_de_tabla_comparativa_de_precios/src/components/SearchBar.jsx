import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm, handleSearch, isSearching }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 opacity-50 pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-3">
          ¿Qué medicamento buscas?
        </h2>
        <p className="text-slate-500 mb-8 text-lg font-medium">
          Compara precios en tiempo real y encuentra la mejor opción cerca de ti.
        </p>

        <form onSubmit={handleSearch} className="relative max-w-3xl">
          <div className="relative flex items-center group">
            <Search className="absolute left-5 text-slate-400 h-6 w-6 group-focus-within:text-emerald-500 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Ej. Paracetamol 500mg, Omeprazol, Ibuprofeno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-36 py-5 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-700 font-semibold text-lg shadow-sm placeholder:text-slate-400 placeholder:font-normal"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <button
                type="submit"
                disabled={isSearching}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:transform-none flex items-center gap-2"
              >
                {isSearching ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Buscando
                  </>
                ) : (
                  'Buscar'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

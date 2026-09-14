import React from 'react';
import { ShoppingCart, Store, AlertCircle, ExternalLink, TrendingDown } from 'lucide-react';

export default function PriceTable({ results, searchTerm }) {
  if (!results || results.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingDown className="text-emerald-600 h-6 w-6" />
            Resultados para "<span className="text-emerald-600">{searchTerm}</span>"
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Comparamos {results.length} opciones en farmacias cercanas a tu ubicación.
          </p>
        </div>
        
        <div className="flex gap-2">
          <select className="bg-white border-2 border-slate-200 text-slate-700 text-sm font-semibold rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 block p-3 outline-none cursor-pointer transition-all hover:border-slate-300">
            <option>Ordenar por: Menor Precio</option>
            <option>Ordenar por: Más Cercano</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs tracking-wider uppercase font-bold">
            <tr>
              <th scope="col" className="px-8 py-5">Farmacia</th>
              <th scope="col" className="px-8 py-5">Precio</th>
              <th scope="col" className="px-8 py-5">Disponibilidad</th>
              <th scope="col" className="px-8 py-5">Distancia</th>
              <th scope="col" className="px-8 py-5 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((result, index) => (
              <tr 
                key={result.id} 
                className={`transition-all duration-200 hover:bg-emerald-50/40 ${index === 0 ? 'bg-emerald-50/20' : ''}`}
              >
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm shrink-0">
                       <Store className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 flex items-center gap-2 text-base">
                        {result.farmacia}
                        {index === 0 && (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
                            Mejor Opción
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-medium">
                        Actualizado: {result.actualizado}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-baseline gap-1">
                    <span className="text-slate-400 font-semibold text-lg">$</span>
                    <span className={`font-extrabold text-2xl ${index === 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {result.precio.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  {result.stock ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      En stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
                      <AlertCircle className="h-4 w-4" />
                      Agotado
                    </span>
                  )}
                </td>
                <td className="px-8 py-5 text-slate-500 font-semibold whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-slate-100 px-2 py-1 rounded-md text-sm">{result.distancia}</span>
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-right">
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                      result.stock 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    }`}
                    onClick={(e) => !result.stock && e.preventDefault()}
                  >
                    <ShoppingCart size={18} />
                    Comprar
                    <ExternalLink size={16} className="opacity-70 ml-1" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

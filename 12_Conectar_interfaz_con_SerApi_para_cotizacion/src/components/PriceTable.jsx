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
      </div>

      {/* Vista de Escritorio (Tabla) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs tracking-wider uppercase font-bold">
            <tr>
              <th scope="col" className="px-8 py-5">Producto</th>
              <th scope="col" className="px-8 py-5">Vendedor / Tienda</th>
              <th scope="col" className="px-8 py-5">Precio</th>
              <th scope="col" className="px-8 py-5">Detalles / Envío</th>
              <th scope="col" className="px-8 py-5 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((result, index) => (
              <tr 
                key={result.id} 
                className={`transition-all duration-200 hover:bg-emerald-50/40 ${index === 0 ? 'bg-emerald-50/20' : ''}`}
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm shrink-0">
                       {result.thumbnail ? <img src={result.thumbnail} alt={result.title} className="object-cover w-full h-full" /> : <Store className="h-6 w-6 text-emerald-500" />}
                    </div>
                    <div className="max-w-[250px]">
                      <div className="font-bold text-slate-800 text-sm line-clamp-3" title={result.title}>
                        {result.title}
                      </div>
                      {index === 0 && (
                        <span className="inline-block mt-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
                          Mejor Opción
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="font-bold text-slate-700 text-base">
                    {result.source}
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-baseline gap-1">
                    <span className="text-slate-400 font-semibold text-lg">$</span>
                    <span className={`font-extrabold text-2xl ${index === 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {result.extracted_price ? result.extracted_price.toFixed(2) : 'N/D'}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5 text-slate-500 font-semibold whitespace-nowrap">
                  <div className="flex flex-col gap-1.5">
                    {result.delivery ? (
                      <span className="bg-slate-100 px-2 py-1 rounded-md text-sm whitespace-pre-wrap max-w-[150px] line-clamp-2" title={result.delivery}>{result.delivery}</span>
                    ) : (
                      <span className="text-sm text-slate-400 italic">No especificado</span>
                    )}
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-right">
                  <a
                    href={result.link || result.product_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-300 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5"
                  >
                    Más detalles
                    <ExternalLink size={16} className="opacity-70 ml-1" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista Móvil (Tarjetas) */}
      <div className="md:hidden flex flex-col divide-y divide-slate-100">
        {results.map((result, index) => (
          <div key={result.id} className={`p-5 flex flex-col gap-4 transition-all ${index === 0 ? 'bg-emerald-50/40' : 'bg-white'}`}>
            {/* Cabecera de la tarjeta: Tienda y Etiqueta Mejor Opción */}
            <div className="flex justify-between items-start">
              <div className="font-bold text-slate-700 text-sm flex items-center gap-2">
                <Store className="h-4 w-4 text-emerald-500" />
                {result.source}
              </div>
              {index === 0 && (
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
                  Mejor Opción
                </span>
              )}
            </div>
            
            {/* Contenido principal: Imagen + Nombre y Precio */}
            <div className="flex gap-4 items-center">
              <div className="h-20 w-20 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm shrink-0">
                {result.thumbnail ? <img src={result.thumbnail} alt={result.title} className="object-cover w-full h-full" /> : <Store className="h-8 w-8 text-emerald-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-800 text-sm line-clamp-2 leading-tight" title={result.title}>
                  {result.title}
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-slate-400 font-semibold text-sm">$</span>
                  <span className={`font-extrabold text-xl ${index === 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {result.extracted_price ? result.extracted_price.toFixed(2) : 'N/D'}
                  </span>
                </div>
              </div>
            </div>

            {/* Detalles Envío */}
            {result.delivery && (
              <div className="bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100 flex items-start gap-2">
                <span className="font-semibold text-slate-600 text-xs shrink-0 mt-0.5">Envío:</span> 
                <span className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">{result.delivery}</span>
              </div>
            )}

            {/* Botón Comprar */}
            <a
              href={result.link || result.product_link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 bg-emerald-600 active:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
            >
              Más detalles
              <ExternalLink size={16} className="opacity-70 ml-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

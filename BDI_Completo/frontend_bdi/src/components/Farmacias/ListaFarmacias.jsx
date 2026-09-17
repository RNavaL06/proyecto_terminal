import React from 'react';
import { MapPin, Navigation, Store } from 'lucide-react';

export const ListaFarmacias = ({ farmacias }) => {
  return (
    <div className="w-full flex flex-col h-[50vh] md:h-[90vh]">
      <div className="bg-white rounded-t-3xl border-b border-slate-100 p-6 shadow-sm z-10">
        <div className="flex items-center gap-3 text-emerald-600 mb-2">
          <div className="bg-emerald-100 p-2 rounded-full"><MapPin className="w-6 h-6" /></div>
          <h1 className="text-2xl font-bold text-slate-800">Cerca de ti</h1>
        </div>
        <p className="text-sm text-slate-500">Se encontraron {farmacias.length} farmacias.</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-100/50 p-4 space-y-4 rounded-b-3xl shadow-inner">
        {farmacias.map((farmacia, index) => (
          <div key={farmacia.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400"></div>
            <div className="flex justify-between items-start pl-2">
              <div>
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Store className="w-5 h-5 text-emerald-500" /> {farmacia.nombre}
                </h3>
                <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
                  <Navigation className="w-4 h-4" /> A {farmacia.distanciaMetros} metros
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
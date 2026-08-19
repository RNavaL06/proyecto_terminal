import React, { useState, useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { obtenerFarmacias } from '../services/api';
import { MapaInteractivo } from '../components/Mapa/MapaInteractivo';
import { ListaFarmacias } from '../components/Farmacias/ListaFarmacias';
import { Loader2 } from 'lucide-react';

export const MapaFarmaciasPage = () => {
  const { ubicacion, errorGps } = useGeolocation();
  const [farmacias, setFarmacias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!ubicacion) return;
    
    const buscarDatos = async () => {
      try {
        const datos = await obtenerFarmacias(ubicacion.lat, ubicacion.lng);
        setFarmacias(datos);
      } catch (error) {
        console.error("Error al obtener farmacias");
      } finally {
        setIsLoading(false);
      }
    };
    
    buscarDatos();
  }, [ubicacion]);

  if (errorGps) return <div className="p-8 text-red-600 text-center font-bold">{errorGps}</div>;
  
  if (isLoading || !ubicacion) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-emerald-600">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <h2 className="text-xl font-bold text-slate-700">Obteniendo ubicación...</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col md:flex-row gap-6">
      <ListaFarmacias farmacias={farmacias} />
      <div className="w-full md:w-2/3 h-[50vh] md:h-[90vh]">
        <MapaInteractivo ubicacion={ubicacion} farmacias={farmacias} />
      </div>
    </div>
  );
};
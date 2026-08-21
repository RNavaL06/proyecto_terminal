import React, { useState, useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { obtenerFarmacias } from '../services/api';
import { MapaInteractivo } from '../components/Mapa/MapaInteractivo';
import { ListaFarmacias } from '../components/Farmacias/ListaFarmacias';
import BuscadorDirecciones from '../components/Farmacias/BuscadorDirecciones'; // <-- IMPORTA EL BUSCADOR
import { Loader2 } from 'lucide-react';

export const MapaFarmaciasPage = () => {
  const { ubicacion: ubicacionGps, errorGps } = useGeolocation();
  
  // Nuevo estado para manejar las coordenadas actuales (GPS o Búsqueda manual)
  const [coordenadasActivas, setCoordenadasActivas] = useState(null);
  const [farmacias, setFarmacias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Inicializar coordenadasActivas cuando el GPS responda por primera vez
  useEffect(() => {
    if (ubicacionGps && !coordenadasActivas) {
      setCoordenadasActivas(ubicacionGps);
    }
  }, [ubicacionGps]);

  // Hacer la petición al backend CADA VEZ que cambien las coordenadas activas
  useEffect(() => {
    if (!coordenadasActivas) return;
    
    const buscarDatos = async () => {
      setIsLoading(true);
      try {
        const datos = await obtenerFarmacias(coordenadasActivas.lat, coordenadasActivas.lng);
        setFarmacias(datos);
      } catch (error) {
        console.error("Error al obtener farmacias");
      } finally {
        setIsLoading(false);
      }
    };
    
    buscarDatos();
  }, [coordenadasActivas]); // <-- Dependencia actualizada

  // Manejador que recibe las coordenadas del Buscador
  const manejarNuevaUbicacion = (lat, lng, nombre) => {
    setCoordenadasActivas({ lat, lng, nombre });
  };

  if (errorGps && !coordenadasActivas) return <div className="p-8 text-red-600 text-center font-bold">{errorGps}</div>;
  
  if (!coordenadasActivas) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-emerald-600">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <h2 className="text-xl font-bold text-slate-700">Obteniendo ubicación...</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col md:flex-row gap-6">
      <div className="w-auto z-[1000] ">
          <BuscadorDirecciones onSeleccion={manejarNuevaUbicacion} />
          <ListaFarmacias farmacias={farmacias} />
        </div>
      
      
      {/* Contenedor derecho: Buscador + Mapa */}
      <div className="w-full md:w-2/3 flex flex-col gap-4 h-[50vh] md:h-[90vh]">
        
        {/* 1. EL BUSCADOR INTEGRADO */}
        

        {/* 2. EL MAPA (Se envuelve en un flex-1 para ocupar el espacio restante) */}
        <div className="flex-1 w-full relative z-0">
          <MapaInteractivo 
            ubicacion={coordenadasActivas} 
            farmacias={farmacias} 
          />
        </div>

      </div>
    </div>
  );
};
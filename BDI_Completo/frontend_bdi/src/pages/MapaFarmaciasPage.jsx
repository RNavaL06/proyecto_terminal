import React, { useState, useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { obtenerFarmacias } from '../services/api';
import { MapaInteractivo } from '../components/Mapa/MapaInteractivo';
import { ListaFarmacias } from '../components/Farmacias/ListaFarmacias';
import BuscadorDirecciones from '../components/Farmacias/BuscadorDirecciones'; // <-- IMPORTA EL BUSCADOR
import { Loader2 } from 'lucide-react';

export const MapaFarmaciasPage = () => {
  const { ubicacion: ubicacionGps, errorGps } = useGeolocation();
  
  const [coordenadasActivas, setCoordenadasActivas] = useState(() => {
    const cached = sessionStorage.getItem('bdi_farmacias_coordenadas');
    return cached ? JSON.parse(cached) : null;
  });
  
  const [farmacias, setFarmacias] = useState(() => {
    const cached = sessionStorage.getItem('bdi_farmacias_resultados');
    return cached ? JSON.parse(cached) : [];
  });
  
  const [isLoading, setIsLoading] = useState(!coordenadasActivas);

  // Inicializar coordenadasActivas cuando el GPS responda por primera vez (Solo si no hay caché)
  useEffect(() => {
    if (ubicacionGps && !coordenadasActivas) {
      setCoordenadasActivas(ubicacionGps);
    }
  }, [ubicacionGps, coordenadasActivas]);

  // Hacer la petición al backend CADA VEZ que cambien las coordenadas activas, si no están en caché
  useEffect(() => {
    if (!coordenadasActivas) return;
    
    sessionStorage.setItem('bdi_farmacias_coordenadas', JSON.stringify(coordenadasActivas));

    const buscarDatos = async () => {
      const fetchedCoordsStr = sessionStorage.getItem('bdi_farmacias_coordenadas_fetched');
      const fetchedCoords = fetchedCoordsStr ? JSON.parse(fetchedCoordsStr) : null;

      // Si las coordenadas actuales ya fueron fetcheadas y tenemos farmacias, no consultamos a la API
      if (fetchedCoords && fetchedCoords.lat === coordenadasActivas.lat && fetchedCoords.lng === coordenadasActivas.lng && farmacias.length > 0) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const datos = await obtenerFarmacias(coordenadasActivas.lat, coordenadasActivas.lng);
        setFarmacias(datos);
        sessionStorage.setItem('bdi_farmacias_resultados', JSON.stringify(datos));
        sessionStorage.setItem('bdi_farmacias_coordenadas_fetched', JSON.stringify(coordenadasActivas));
      } catch (error) {
        console.error("Error al obtener farmacias");
      } finally {
        setIsLoading(false);
      }
    };
    
    buscarDatos();
  }, [coordenadasActivas]);

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

export default MapaFarmaciasPage;
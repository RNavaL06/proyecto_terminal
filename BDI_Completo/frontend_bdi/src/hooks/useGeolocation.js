import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  // Inicialización de estados para almacenar las coordenadas o capturar fallos
  const [ubicacion, setUbicacion] = useState(null);
  const [errorGps, setErrorGps] = useState(null);

  useEffect(() => {
    // 1. Validación de soporte estructural en el dispositivo o navegador
    if (!navigator.geolocation) {
      setErrorGps('Tu navegador no soporta geolocalización.');
      return;
    }

    // 2. Ejecución asíncrona de la API nativa para obtener la ubicación
    navigator.geolocation.getCurrentPosition(
      // Callback de éxito: Mapea la latitud y longitud devueltas por el hardware
      (pos) => setUbicacion({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      
      // Callback de rechazo: Intercepta la denegación de permisos del usuario
      (err) => setErrorGps('Por favor, permite el acceso a tu ubicación.'),
      
      // Configuración de la petición: Fuerza el uso del GPS para precisión clínica
      { enableHighAccuracy: true }
    );
  }, []); // El arreglo de dependencias vacío asegura su ejecución única al montar la vista

  // Retorno del estado encapsulado para su consumo en la interfaz visual
  return { ubicacion, errorGps };
};
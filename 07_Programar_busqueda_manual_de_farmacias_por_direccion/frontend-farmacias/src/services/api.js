import axios from 'axios';

//Creamos una instancia global pre-configurada
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});


// Interceptor: Se ejecuta ANTES de que cualquier petición salga del frontend
apiClient.interceptors.request.use(
  (config) => {
    // Aquí en el futuro sacarás el token de localStorage o del estado global (Zustand/Redux)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzg3MDU1ODM1LCJleHAiOjE3ODczMjk0MzV9.L5U4eN1xa3FCnPzXKUv8eQAWNi0EC5ThXC8xdfXKm74";
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const obtenerFarmacias = async (lat, lng) => {
  const response = await apiClient.get(`/farmacias?lat=${lat}&lng=${lng}`);
  return response.data;
};

export const buscarDirecciones = async (query) => {
  const response = await apiClient.get(`/ubicaciones/sugerencias?texto=${query}`);
  return response.data; // Retorna directamente la data, el componente no necesita saber de axios
};
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

// función para enviar imagen al backend 
export const analizarRecetaMedica = async (imagenBase64) => {
  try {
    // Axios usa la baseURL, así que solo pasamos la ruta final
    const response = await apiClient.post('/recetas/analizar', { imagenBase64 });
    
    // Axios automáticamente hace el JSON.parse y lo guarda en response.data
    return response.data.datos_clinicos;

  } catch (error) {
    // Axios detecta automáticamente los status 400 y 500 y cae en este catch
    // Extraemos el mensaje de error que programaste en tu Node.js (error.response.data.mensaje)
    const mensajeError = error.response?.data?.mensaje || "Error al conectar con el servidor.";
    throw new Error(mensajeError);
  }
};
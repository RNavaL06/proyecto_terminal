import axios from 'axios';

// Creamos una instancia global pre-configurada
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor: Se ejecuta ANTES de que cualquier petición salga del frontend
apiClient.interceptors.request.use(
  (config) => {
    // Token JWT de prueba para desarrollo
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

// Función para enviar imagen al backend (OCR / Gemini)
export const analizarRecetaMedica = async (imagenBase64) => {
  try {
    const response = await apiClient.post('/recetas/analizar', { imagenBase64 });
    return response.data.datos_clinicos;
  } catch (error) {
    const mensajeError = error.response?.data?.mensaje || "Error al conectar con el servidor.";
    throw new Error(mensajeError);
  }
};

// Función asíncrona para guardar el JSON de la receta en la base de datos MySQL mediante el backend
export const guardarRecetaMedica = async (datosClinicos) => {
  try {
    const response = await apiClient.post('/recetas/guardar', {
      datos_clinicos: datosClinicos
    });
    return response.data;
  } catch (error) {
    const mensajeError = error.response?.data?.mensaje || "Error al guardar la receta en la base de datos.";
    throw new Error(mensajeError);
  }
};
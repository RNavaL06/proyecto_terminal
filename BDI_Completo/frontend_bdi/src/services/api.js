import axios from 'axios';

// Instancia global pre-configurada apuntando al backend unificado a través del proxy de Vite
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor: Se ejecuta ANTES de que cualquier petición salga del frontend
apiClient.interceptors.request.use(
  (config) => {
    // Obtener el token guardado en localStorage
    const token = localStorage.getItem('bdi_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Endpoints de Farmacias
export const obtenerFarmacias = async (lat, lng) => {
  const response = await apiClient.get(`/farmacias?lat=${lat}&lng=${lng}`);
  return response.data;
};

export const buscarDirecciones = async (query) => {
  const response = await apiClient.get(`/ubicaciones/sugerencias?texto=${query}`);
  return response.data;
};

// Endpoints de NLP / Sintomas
export const analizarSintomasNLP = async (frase) => {
  try {
    const response = await apiClient.post('/sintomas/analizar', { frase });
    return response.data;
  } catch (error) {
    const mensaje = error.response?.data?.mensaje || "Error al comunicarse con el servidor de análisis NLP.";
    throw new Error(mensaje);
  }
};

export const analizarRecetaMedica = async (base64String) => {
  try {
    const response = await apiClient.post('/recetas/analizar', {
      imagenBase64: base64String
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const guardarRecetaMedica = async (datosClinicos) => {
  try {
    const response = await apiClient.post('/recetas/guardar', datosClinicos);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const scanMedicineLLM = async (imageBase64) => {
  try {
      const response = await apiClient.post('/botiquin/llm-scan', { imageBase64 });
      return response.data;
  } catch (error) {
      console.error("Error scanning medicine:", error);
      throw error;
  }
};
// Endpoint de Autenticación
export const loginWithGoogle = async (googleToken) => {
  try {
    const response = await apiClient.post('/auth/google', { token: googleToken });
    return response.data;
  } catch (error) {
    console.error("Error authenticating with backend:", error);
    throw error;
  }
};

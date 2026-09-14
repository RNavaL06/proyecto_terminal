import axios from 'axios';

// Token proporcionado por el usuario
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzg3MjI4NTUyLCJleHAiOjE3ODc1MDIxNTJ9.rvzhL02R_vRWqjaQF92Ua3u9poSf6vmH6wiJwieuzWs";

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`
  }
});

/**
 * Envía la frase transcrita al backend para obtener los diagnósticos CIE-10
 * @param {string} frase - Frase médica coloquial dictada por el usuario
 * @returns {Promise<Array>} - Arreglo de resultados de diagnóstico
 */
export const analizarSintomasNLP = async (frase) => {
  try {
    const response = await apiClient.post('/sintomas/analizar', { frase });
    return response.data; // Devuelve todo: exito, mensaje, resultados, historial
  } catch (error) {
    const mensaje = error.response?.data?.mensaje || "Error al comunicarse con el servidor de análisis NLP.";
    throw new Error(mensaje);
  }
};

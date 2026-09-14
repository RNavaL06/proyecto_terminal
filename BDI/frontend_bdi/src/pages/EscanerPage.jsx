import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { convertirABase64 } from '../utils/fileHelper';
import { analizarRecetaMedica, guardarRecetaMedica } from '../services/api';
import FormularioEdicionModal from '../components/Escaner/FormularioEdicionModal';

const EscanerPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [datosClinicos, setDatosClinicos] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setIsLoading(true); // Se activa el Spinner de pantalla completa

    try {
      const base64 = await convertirABase64(selectedFile);
      const resultado = await analizarRecetaMedica(base64);
      
      setDatosClinicos(resultado.datos_clinicos || resultado);
      setIsModalOpen(true); 
      toast.success('Extracción completada');

    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false); // Apagamos el Spinner
      e.target.value = null; 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans relative">
      <Toaster position="top-center" />

      {/* PANTALLA PRINCIPAL DE CAPTURA */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-slate-200 p-8 text-center">
        <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Camera className="w-10 h-10 text-blue-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Escanear Receta</h1>
        <p className="text-slate-500 text-sm mb-8">
          Toma una foto de la receta médica o selecciona una imagen de tu galería para extraer los datos.
        </p>

        <label className="relative flex justify-center items-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-2xl shadow-md transition-all active:scale-[0.98] cursor-pointer">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="hidden" 
            disabled={isLoading}
          />
          <ImageIcon className="w-6 h-6" />
          Seleccionar Imagen
        </label>
      </div>

      {/* =========================================
          NUEVO: OVERLAY DE CARGA (SPINNER MÓVIL)
          ========================================= */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center text-white px-6 animate-in fade-in duration-200">
          
          {/* Spinner animado con icono de IA */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="bg-slate-800 p-4 rounded-full">
              <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-2 text-center">Analizando Receta</h2>
          <p className="text-slate-300 text-sm text-center max-w-[250px] leading-relaxed">
            Se están extrayendo los datos médicos, por favor espera un momento...
          </p>
        </div>
      )}

      {/* Renderizado condicional del Modal de Edición */}
      {isModalOpen && datosClinicos && (
        <FormularioEdicionModal 
          datosIniciales={datosClinicos} 
          onClose={() => setIsModalOpen(false)}
          onSave={async (datosValidados) => {
            try {
              setIsLoading(true);
              await guardarRecetaMedica(datosValidados);
              toast.success("Información guardada exitosamente en la base de datos");
              setIsModalOpen(false);
            } catch (err) {
              toast.error("Error al guardar: " + (err.response?.data?.mensaje || err.message));
            } finally {
              setIsLoading(false);
            }
          }}
        />
      )}
    </div>
  );
};

export default EscanerPage;
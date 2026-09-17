import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles, FileText, Package } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { convertirABase64 } from '../utils/fileHelper';
import { analizarRecetaMedica, guardarRecetaMedica } from '../services/api';
import FormularioEdicionModal from '../components/Escaner/FormularioEdicionModal';

// Componentes Nuevos (Míos)
import CameraCapture from '../components/Scanner/CameraCapture';
import MedicineForm from '../components/Scanner/MedicineForm';

const EscanerPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'receta'); // 'receta' o 'caja'
  
  // Estado para Recetas
  const [isLoading, setIsLoading] = useState(false);
  const [datosClinicos, setDatosClinicos] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para Cajas de Medicamentos (LLM)
  const [scannedBoxData, setScannedBoxData] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setIsLoading(true);

    try {
      const base64 = await convertirABase64(selectedFile);
      const resultado = await analizarRecetaMedica(base64);
      
      setDatosClinicos(resultado.datos_clinicos || resultado);
      setIsModalOpen(true); 
      toast.success('Extracción de receta completada');

    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      e.target.value = null; 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans relative pb-24">
      <Toaster position="top-center" />

      {/* Selector de Modo */}
      <div className="flex bg-white p-1 rounded-full mb-6 max-w-sm w-full shadow-sm border border-slate-100">
        <button
          onClick={() => setActiveTab('receta')}
          className={`flex-1 py-2 px-4 rounded-full flex items-center justify-center text-sm font-bold transition-all ${activeTab === 'receta' ? 'bg-blue-50 text-blue-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <FileText className="w-4 h-4 mr-2" />
          Receta Médica
        </button>
        <button
          onClick={() => setActiveTab('caja')}
          className={`flex-1 py-2 px-4 rounded-full flex items-center justify-center text-sm font-bold transition-all ${activeTab === 'caja' ? 'bg-blue-50 text-blue-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Package className="w-4 h-4 mr-2" />
          Caja/Medicamento
        </button>
      </div>

      {activeTab === 'receta' ? (
        /* PANTALLA DE CAPTURA DE RECETAS (Original) */
        <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center animate-in fade-in zoom-in duration-200">
          <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-10 h-10 text-blue-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Escanear Receta</h1>
          <p className="text-slate-500 text-sm mb-8">
            Toma una foto de la receta médica o selecciona una imagen de tu galería para extraer los datos.
          </p>

          <label className="relative flex justify-center items-center gap-2 w-full bg-rose-400 text-white font-bold py-4 px-4 rounded-full shadow-md transition-all active:scale-[0.98] cursor-pointer hover:bg-rose-500">
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
      ) : (
        /* PANTALLA DE CAPTURA DE CAJAS DE MEDICAMENTO (Nueva) */
        <div className="max-w-md w-full animate-in fade-in zoom-in duration-200">
          {scannedBoxData ? (
            <MedicineForm 
              initialData={scannedBoxData} 
              onCancel={() => setScannedBoxData(null)}
              onSave={(data) => {
                  toast.success("¡Medicamento guardado en el botiquín con éxito!");
                  setScannedBoxData(null);
              }}
            />
          ) : (
            <CameraCapture onDataExtracted={setScannedBoxData} />
          )}
        </div>
      )}

      {/* OVERLAY DE CARGA (SPINNER MÓVIL) */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center text-white px-6 animate-in fade-in duration-200">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="bg-slate-800 p-4 rounded-full shadow-sm">
              <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2 text-center text-white">Analizando Receta</h2>
          <p className="text-slate-300 text-sm text-center max-w-[250px] leading-relaxed">
            Se están extrayendo los datos médicos, por favor espera un momento...
          </p>
        </div>
      )}

      {/* Modal de Edición de Recetas */}
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
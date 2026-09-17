import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff, RefreshCw, Send } from 'lucide-react';

const DictadorVoz = ({ onAnalizarSintomas, isLoading }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [textoManual, setTextoManual] = useState('');
  const [permisoDenegado, setPermisoDenegado] = useState(false);

  // Sincronizar la transcripción automática con el estado manual editable
  useEffect(() => {
    if (transcript) {
      setTextoManual(transcript);
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-red-700">
        <p className="font-bold">Error de compatibilidad</p>
        <p className="text-sm">Tu navegador no soporta el reconocimiento de voz web. Por favor intenta en Google Chrome o Microsoft Edge.</p>
      </div>
    );
  }

  const toggleEscucha = async () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setPermisoDenegado(false);
        resetTranscript();
        setTextoManual('');
        SpeechRecognition.startListening({ continuous: true, language: 'es-MX' });
      } catch (err) {
        console.error("Error al acceder al micrófono:", err);
        setPermisoDenegado(true);
      }
    }
  };

  const handleEnviar = () => {
    if (textoManual.trim().length > 0) {
      // Detenemos el micro si sigue activo antes de enviar
      if (listening) SpeechRecognition.stopListening();
      onAnalizarSintomas(textoManual);
    }
  };

    return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 max-w-2xl mx-auto">
      
      {permisoDenegado && (
        <div className="mb-4 bg-orange-50 p-4 rounded-xl border border-orange-200 text-orange-800 flex items-center gap-3">
          <div className="flex-shrink-0">
            <MicOff className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="font-bold text-sm">Permiso de micrófono denegado</p>
            <p className="text-xs mt-1">Por favor, permite el acceso al micrófono en tu navegador para usar esta función, o escribe tus síntomas manualmente.</p>
          </div>
        </div>
      )}

      {/* Botón Central de Micrófono */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="relative">
          {listening && !permisoDenegado && (
            <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75"></div>
          )}
          <button
            onClick={toggleEscucha}
            className={`relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 shadow-md ${
              permisoDenegado 
                ? 'bg-slate-300 text-slate-500' 
                : listening
                  ? 'bg-red-400 text-white hover:bg-red-500 scale-105'
                  : 'bg-blue-400 text-white hover:bg-blue-500'
            }`}
          >
            {listening && !permisoDenegado ? <Mic className="w-10 h-10 animate-pulse" /> : <MicOff className="w-8 h-8" />}
          </button>
        </div>

        <p className={`mt-4 font-bold text-lg transition-colors ${
          permisoDenegado 
            ? 'text-slate-400' 
            : listening 
              ? 'text-red-500' 
              : 'text-slate-600'
        }`}>
          {permisoDenegado 
            ? 'Micrófono desactivado' 
            : listening 
              ? 'Escuchando síntomas...' 
              : 'Toca para dictar síntomas'}
        </p>
      </div>

      {/* Caja de Texto Editable */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <label className="text-sm font-semibold text-slate-500">Transcripción en tiempo real</label>
          <button
            onClick={() => { resetTranscript(); setTextoManual(''); }}
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Limpiar
          </button>
        </div>

        <textarea
          rows="4"
          value={textoManual}
          onChange={(e) => setTextoManual(e.target.value)}
          placeholder="Ej. Me duele la cabeza y tengo ganas de vomitar..."
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 text-lg resize-none"
        />
      </div>

      <div className="mt-6">
        <button
          onClick={handleEnviar}
          disabled={textoManual.trim().length === 0 || isLoading}
          className="w-full flex items-center justify-center gap-2 bg-rose-400 hover:bg-rose-500 disabled:bg-rose-200 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-full transition-all shadow-md"
        >
          {isLoading ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          {isLoading ? 'Analizando Síntomas...' : 'Analizar Síntomas'}
        </button>
      </div>

    </div>
  );
};

export default DictadorVoz;

import React, { useState } from 'react';
import { AlertTriangle, Activity } from 'lucide-react';
import DictadorVoz from '../components/Voz/DictadorVoz';
import ResultadosDiagnostico from '../components/Voz/ResultadosDiagnostico';
import { analizarSintomasNLP } from '../services/api';

function CapturaVozPage() {
  const [resultados, setResultados] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState(null);

  const handleAnalizar = async (frase) => {
    setIsLoading(true);
    setErrorMensaje(null);
    setResultados([]);
    setHistorial([]);

    try {
      const data = await analizarSintomasNLP(frase);
      setResultados(data.resultados || []);
      setHistorial(data.historial || []);
    } catch (error) {
      setErrorMensaje(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto space-y-8">
        <main className="space-y-6">
          <DictadorVoz
            onAnalizarSintomas={handleAnalizar}
            isLoading={isLoading}
          />

          {errorMensaje && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-center gap-3 shadow-sm">
              <AlertTriangle className="w-6 h-6 flex-shrink-0 text-red-500" />
              <p className="text-sm font-medium">{errorMensaje}</p>
            </div>
          )}

          {resultados.length > 0 ? (
            <ResultadosDiagnostico resultados={resultados} historial={historial} />
          ) : (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 p-12">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Activity className="w-10 h-10 text-slate-300" />
              </div>
              <h2 className="text-xl font-bold text-slate-400">Esperando síntomas</h2>
              <p className="text-slate-400 text-sm mt-2 text-center max-w-xs">
                Toca el micrófono arriba y dicta tus síntomas para ver los diagnósticos sugeridos.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default CapturaVozPage;

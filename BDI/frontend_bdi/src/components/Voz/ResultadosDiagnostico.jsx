import React, { useState, useEffect } from 'react';
import { ClipboardList, Volume2, Square, MapPin, Pill, Clock, AlertCircle, AlertTriangle } from 'lucide-react';

const ResultadosDiagnostico = ({ resultados, historial }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  if (!resultados || resultados.length === 0) return null;

  // Extraemos palabras clave
  let todasPalabrasClave = [];
  resultados.forEach(item => {
    let kw = [];
    try {
      kw = typeof item.keywords === 'string' ? JSON.parse(item.keywords) : (item.keywords || []);
    } catch (e) { }
    todasPalabrasClave = [...todasPalabrasClave, ...kw];
  });
  const palabrasUnicas = [...new Set(todasPalabrasClave)];

  const textoSintomas = palabrasUnicas.length > 0
    ? palabrasUnicas.slice(0, 3).join(", ")
    : "los malestares que mencionaste";

  // Función para Fuzzy Matching por palabras clave
  const matchDiagnostico = (terminoIA, diagnosticoReceta) => {
    if (!diagnosticoReceta) return false;
    const cleanIA = terminoIA.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 3);
    const cleanReceta = diagnosticoReceta.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 3);

    // Si alguna palabra clave de la IA está en el diagnóstico del doctor
    return cleanIA.some(word => cleanReceta.includes(word));
  };

  // Nombres de medicamentos para el TTS
  const textoMeds = (historial && historial.length > 0)
    ? historial.slice(0, 2).map(h => h.medicamento).join(" y ") // Leer hasta 2 meds reales
    : "analgésicos de libre venta";

  // Check para alerta de voz si alguno está por agotarse
  const medsPorAgotarse = historial ? historial.filter(h => h.cantidad_disponible < 5) : [];
  const alertaVozAgotado = medsPorAgotarse.length > 0
    ? ` Ten cuidado, noté que algunos medicamentos están por agotarse en tu botiquín.`
    : "";

  const generarGuion = () => {
    let base = `He terminado de escuchar tus malestares. Hemos registrado síntomas como: ${textoSintomas}. `;
    if (historial && historial.length > 0) {
      base += `Al revisar tu expediente real, notamos que anteriormente has tenido recetas de ${textoMeds}.`;
    } else {
      base += `No encontramos recetas previas recientes, pero te sugerimos mantener reposo y buscar ${textoMeds}.`;
    }
    base += alertaVozAgotado;
    base += ` Si necesitas surtir medicamentos, puedes buscar las farmacias más cercanas.`;
    return base;
  };

  const toggleAudio = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(generarGuion());
      utterance.lang = 'es-MX';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-6">

      {/* Encabezado Paciente */}
      <div className="bg-sky-50 border-b border-sky-100 p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-sky-200 p-2 rounded-full">
            <ClipboardList className="w-6 h-6 text-sky-700" />
          </div>
          <h2 className="text-xl font-bold text-sky-900 tracking-tight">Resumen de Síntomas</h2>
        </div>

        <button
          onClick={toggleAudio}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${isSpeaking
            ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
            : 'bg-white text-sky-700 border border-sky-200 hover:bg-sky-100'
            }`}
        >
          {isSpeaking ? (
            <><Square className="w-4 h-4 fill-current" /> Detener Voz</>
          ) : (
            <><Volume2 className="w-4 h-4" /> Escuchar</>
          )}
        </button>
      </div>

      {/* Alerta de Aviso Médico */}
      <div className="bg-rose-50 border-b border-rose-100 p-4">
        <div className="flex gap-3 max-w-4xl mx-auto items-start md:items-center text-rose-800">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 md:mt-0 text-rose-600" />
          <p className="text-sm leading-relaxed font-medium">
            <strong className="font-bold">Aviso importante:</strong> Los resultados presentados a continuación son únicamente informativos y <span className="underline decoration-rose-300 underline-offset-2">no sustituyen bajo ninguna circunstancia el diagnóstico, consulta u opinión de un profesional certificado</span>.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-8">

        {/* Sección: Lo que detectamos */}
        <div>
          <h3 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">Malestares registrados</h3>
          <div className="flex flex-wrap gap-2">
            {palabrasUnicas.length > 0 ? (
              palabrasUnicas.map((kw, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 font-medium shadow-sm">
                  {kw}
                </span>
              ))
            ) : (
              <span className="text-slate-500 italic">No se detectaron palabras clave específicas.</span>
            )}
          </div>
        </div>

        {/* Sección: Historial y Recomendación */}
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-emerald-400"></div>

          <div className="flex items-start gap-3 pl-2">
            <Clock className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="w-full">
              <h3 className="font-bold text-emerald-900 text-lg">Tu Historial Médico (Relacionado)</h3>
              <p className="text-emerald-800 text-sm mt-1 leading-relaxed">
                De acuerdo con tu expediente, buscamos qué te recetaron anteriormente para cada padecimiento actual:
              </p>

              <div className="mt-5 w-full">
                {resultados.map((resultadoIA, idxDiag) => {
                  const diagIA = resultadoIA.termino_medico;

                  // Encontrar historial que haga match con tokens
                  const historialRelacionado = historial ? historial.filter(item => matchDiagnostico(diagIA, item.diagnostico)) : [];

                  return (
                    <div key={idxDiag} className="mb-6 last:mb-0">
                      <h4 className="text-xs font-extrabold text-emerald-800 mb-3 border-b border-emerald-200/50 pb-1 uppercase tracking-wider">
                        Para: {diagIA}
                      </h4>

                      {historialRelacionado.length > 0 ? (
                        <ul className="space-y-3">
                          {historialRelacionado.map((item, idx) => {
                            const cant = item.cantidad_disponible;
                            let colorClass = "";
                            let textoBadge = "";
                            let Icono = AlertCircle;

                            if (cant === 0) {
                              colorClass = "text-rose-700 bg-rose-50 border-rose-200";
                              textoBadge = "Agotado (0)";
                            } else if (cant >= 1 && cant <= 5) {
                              colorClass = "text-amber-700 bg-amber-50 border-amber-200";
                              textoBadge = `Por agotarse (${cant})`;
                            } else {
                              colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
                              textoBadge = `En inventario (${cant})`;
                              Icono = null;
                            }

                            return (
                              <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl shadow-sm border border-emerald-100/50">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2 font-bold text-slate-700">
                                    <Pill className="w-5 h-5 text-emerald-500" /> {item.medicamento}
                                  </div>
                                  <p className="text-xs text-slate-400 font-medium pl-7 italic">
                                    En base a receta de: {item.diagnostico}
                                  </p>
                                </div>

                                <div className={`flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md border ${colorClass} min-w-[140px]`}>
                                  {Icono && <Icono className="w-4 h-4" />}
                                  {textoBadge}
                                </div>
                              </li>
                            )
                          })}
                        </ul>
                      ) : (
                        <div className="bg-white/60 rounded-lg p-3 border border-emerald-100/30 flex items-center justify-center">
                          <span className="text-sm font-medium text-slate-500 italic">No tienes un historial previo registrado para este padecimiento.</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ResultadosDiagnostico;

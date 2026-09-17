import React from 'react';
import { User, Stethoscope, CheckCircle2, FileText, Info, Pill, Calendar, FlaskConical, Save, Edit3, Activity, PlusSquare } from 'lucide-react';

const FormularioValidacion = ({ datos }) => {
  if (!datos) return null; // Si no hay datos, no renderiza nada

  // Helper para manejar los datos nulos con la clase italic
  const renderDato = (dato, textoAlternativo = "Información no disponible") => {
    return dato ? (
      <span className="text-slate-800">{dato}</span>
    ) : (
      <span className="italic text-slate-400">{textoAlternativo}</span>
    );
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* TARJETA PACIENTE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">
          <User className="w-4 h-4 text-blue-500" /> DATOS DEL PACIENTE
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-slate-500 mb-1">Nombre</p>
            <p className="font-medium text-slate-800">{renderDato(datos.nombre_paciente)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Fecha del Documento</p>
            <p className="font-medium text-slate-800">{renderDato(datos.fecha)}</p>
          </div>
        </div>
      </div>

      {/* TARJETA MÉDICO */}
      <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-5 border-l-4 ${datos.nombre_medico && datos.cedula_profesional ? 'border-l-emerald-600' : 'border-l-amber-500'}`}>
        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">
          <Stethoscope className="w-4 h-4 text-emerald-600" /> DATOS DEL MÉDICO
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500 mb-1">Nombre del Médico</p>
              <p className="font-medium text-slate-800">{renderDato(datos.nombre_medico)}</p>
            </div>
            {datos.nombre_medico && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500 mb-1">Cédula Profesional</p>
              <p className="font-medium text-slate-800">{renderDato(datos.cedula_profesional)}</p>
            </div>
            {datos.cedula_profesional && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
          </div>
        </div>
      </div>

      {/* TARJETA DIAGNÓSTICO E INDICACIONES */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-2">
            <FileText className="w-4 h-4" /> Diagnóstico
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm">
            {renderDato(datos.diagnostico, "Diagnóstico no identificado en el documento")}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-2">
            <Info className="w-4 h-4" /> Indicaciones Generales
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm">
            {renderDato(datos.notas_adicionales || datos.indicaciones, "Sin instrucciones generales especificadas")}
          </div>
        </div>
      </div>

      {/* SECCIÓN MEDICAMENTOS */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <PlusSquare className="text-blue-500 w-5 h-5" /> Medicamentos Detectados
          </h3>
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
            {datos.medicamentos?.length || 0} items
          </span>
        </div>

        <div className="space-y-4">
          {datos.medicamentos?.map((med, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 border-l-4 border-l-blue-500">
              
              <div className="flex gap-3 items-start mb-4">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-500">
                  <Pill className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    {med.nombre_comercial || med.sustancia_activa || "Medicamento Desconocido"}
                    {med.dosis && <span className="text-sm font-normal text-slate-500">{med.dosis}</span>}
                  </h4>
                  {med.formato && (
                    <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md mt-1">
                      {med.formato}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Instrucciones</p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800">
                    {renderDato(med.instrucciones_uso, "Sin instrucciones especificadas")}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FlaskConical className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500 text-xs w-20">Sustancia</span>
                    <span className="font-medium flex-1 text-right">{renderDato(med.sustancia_activa)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500 text-xs w-20">Dosis</span>
                    <span className="font-medium flex-1 text-right">{renderDato(med.dosis)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500 text-xs w-20">Vigencia</span>
                    <span className="font-medium flex-1 text-right">{renderDato(med.fecha_caducidad)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTONES DE ACCIÓN */}
      <div className="pt-4 space-y-3">
        <button className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2">
          <Save className="w-5 h-5" /> Guardar en Mi Botiquín
        </button>
        <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-3.5 px-4 rounded-xl transition-colors flex justify-center items-center gap-2">
          <Edit3 className="w-5 h-5" /> Editar datos
        </button>
      </div>
    </div>
  );
};

export default FormularioValidacion;
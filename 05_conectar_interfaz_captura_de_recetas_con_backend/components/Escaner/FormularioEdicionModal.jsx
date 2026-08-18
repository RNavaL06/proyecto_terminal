import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import { X, Save, AlertOctagon, Sparkles, Eye } from 'lucide-react';

const FormularioEdicionModal = ({ datosIniciales, onClose, onSave }) => {
  const [formData, setFormData] = useState(datosIniciales);

  const handleInputChange = (campo, valor) => {
    setFormData({ ...formData, [campo]: valor });
  };

  const handleMedicationChange = (index, campo, valor) => {
    const nuevosMedicamentos = [...formData.medicamentos];
    nuevosMedicamentos[index] = { ...nuevosMedicamentos[index], [campo]: valor };
    setFormData({ ...formData, medicamentos: nuevosMedicamentos });
  };

  const faltanDatosMedico = !formData.nombre_medico || !formData.cedula_profesional;

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      
      <DialogBackdrop className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-slate-50 text-left align-middle shadow-2xl transition-all">
            
            {/* HEADER */}
            <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-200">
              <DialogTitle as="h2" className="text-lg font-bold text-slate-800">
                Revisión de Datos
              </DialogTitle>
              <button 
                onClick={onClose} 
                className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* CUERPO Y FORMULARIO */}
            <div className="p-4 sm:p-6 space-y-6">

              
              {/* ADVERTENCIA FIRME (Cédula/Médico) */}
                <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex gap-3 items-start shadow-sm flex-col">
                    <div className='flex flex-row items-center'>
                        <AlertOctagon className="w-7 h-7 text-red-600 flex-shrink-0 mt-0.5" />
                        <h3 className="font-bold text-red-700 text-sm mb-1 uppercase tracking-wider">Advertencia de Seguridad</h3>
                    </div>
                  
                <div>
                   
                    <p className="text-sm text-red-800 font-medium leading-snug">
                        <strong>REVISA Y CORRIGE</strong> cualquier detalle para asegurarnos de que todo esté perfecto.
                    </p>
                    {faltanDatosMedico && <p className="text-sm text-red-800 font-medium leading-snug mt-5">Además, no se detectó la cédula profesional o el nombre del médico. Una receta médica sin una cédula visible carece de validez oficial y <strong>podría tratarse de un documento falso</strong>.</p>}
                </div>
                   
                
                </div>

              <form className="space-y-6">
                {/* SECCIÓN PACIENTE */}
                <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-blue-600 mb-4 text-xs uppercase tracking-wider">Paciente y Diagnóstico</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Nombre del Paciente</label>
                      <input 
                        type="text" 
                        value={formData.nombre_paciente || ''}
                        onChange={(e) => handleInputChange('nombre_paciente', e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Diagnóstico</label>
                      <input 
                        type="text" 
                        value={formData.diagnostico || ''}
                        onChange={(e) => handleInputChange('diagnostico', e.target.value)}
                        className="w-full p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Indicaciones (Reposo, dieta, etc.)</label>
                      <textarea 
                        rows="3"
                        value={formData.indicaciones || ''}
                        onChange={(e) => handleInputChange('indicaciones', e.target.value)}
                        placeholder="Sin indicaciones adicionales"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </section>

                {/* SECCIÓN MÉDICO */}
                <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-emerald-600 mb-4 text-xs uppercase tracking-wider">Datos del Médico</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Nombre Completo</label>
                      <input 
                        type="text" 
                        value={formData.nombre_medico || ''}
                        onChange={(e) => handleInputChange('nombre_medico', e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Cédula Profesional</label>
                      <input 
                        type="text" 
                        value={formData.cedula_profesional || ''}
                        onChange={(e) => handleInputChange('cedula_profesional', e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </section>

                {/* SECCIÓN MEDICAMENTOS */}
                <section>
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                    Medicamentos Detectados
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{formData.medicamentos?.length || 0}</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {formData.medicamentos?.map((med, index) => (
                      <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-400"></div>
                        <div className="space-y-3 pl-2">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Medicamento / Sustancia</label>
                            <input 
                              type="text" 
                              value={med.nombre_comercial || med.sustancia_activa || ''}
                              onChange={(e) => handleMedicationChange(index, 'nombre_comercial', e.target.value)}
                              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Dosis</label>
                              <input 
                                type="text" 
                                value={med.dosis || ''}
                                onChange={(e) => handleMedicationChange(index, 'dosis', e.target.value)}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Formato</label>
                              <input 
                                type="text" 
                                value={med.formato || ''}
                                onChange={(e) => handleMedicationChange(index, 'formato', e.target.value)}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Instrucciones</label>
                            <textarea 
                              rows="2"
                              value={med.instrucciones_uso || ''}
                              onChange={(e) => handleMedicationChange(index, 'instrucciones_uso', e.target.value)}
                              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </form>
              
              {/* BOTÓN DE GUARDAR AL FINAL */}
              <div className="pt-4">
                <button 
                  onClick={() => onSave(formData)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-xl shadow-md transition-all"
                >
                  <Save className="w-5 h-5" /> Confirmar y Guardar Información
                </button>
              </div>

            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default FormularioEdicionModal;
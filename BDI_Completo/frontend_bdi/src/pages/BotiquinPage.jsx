import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, Box, Plus } from 'lucide-react';

const BotiquinPage = () => {
    const navigate = useNavigate();

    // Por ahora simulamos que está vacío
    const medicamentos = [];

    return (
        <div className="min-h-[85vh] bg-slate-50 flex flex-col p-6 font-sans pb-24">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Mi Botiquín</h1>
            <p className="text-slate-500 mb-8">Administra tus medicamentos guardados</p>

            {medicamentos.length === 0 ? (
                /* ESTADO VACÍO (Empty State) */
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                    {/* Ilustración / Icono */}
                    <div className="relative mb-6">
                        <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center shadow-sm">
                            <Box className="w-16 h-16 text-blue-500" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md">
                            <Pill className="w-8 h-8 text-blue-400 rotate-45" />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Tu botiquín está vacío</h2>
                    <p className="text-slate-500 max-w-[260px] leading-relaxed mb-8 text-sm">
                        Aún no has agregado ningún medicamento. Comienza escaneando la caja de tus medicinas para llevar un mejor control.
                    </p>

                    {/* Call to action (Botón para ir a escanear) */}
                    <button 
                        onClick={() => navigate('/escaner', { state: { tab: 'caja' } })}
                        className="flex items-center gap-2 bg-rose-400 text-white px-8 py-4 rounded-full font-bold shadow-md hover:bg-rose-500 transition-all active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Agregar Medicamento
                    </button>
                </div>
            ) : (
                /* Lista de medicamentos (Para cuando haya datos) */
                <div className="grid grid-cols-1 gap-4">
                    {/* Aquí irían las tarjetas de medicamentos */}
                </div>
            )}
        </div>
    );
};

export default BotiquinPage;

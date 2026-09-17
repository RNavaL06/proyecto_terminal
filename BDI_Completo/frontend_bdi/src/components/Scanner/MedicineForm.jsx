import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const MedicineForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre_medicamento: '',
        sustancia_activa: '',
        gramaje: '',
        fecha_caducidad: '',
        cantidad: 1
    });

    // Populate form when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre_medicamento: initialData.nombre_medicamento !== "No detectado" ? initialData.nombre_medicamento : '',
                sustancia_activa: initialData.sustancia_activa !== "No detectado" ? initialData.sustancia_activa : '',
                gramaje: initialData.gramaje !== "No detectado" ? initialData.gramaje : '',
                fecha_caducidad: '',
                cantidad: 1
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Verificar Datos</h2>
                <button onClick={onCancel} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">Revisa los datos extraídos por la Inteligencia Artificial y complétalos si es necesario.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Comercial</label>
                    <input 
                        type="text" 
                        name="nombre_medicamento"
                        value={formData.nombre_medicamento} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Ej: Aspirina"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sustancia Activa</label>
                    <input 
                        type="text" 
                        name="sustancia_activa"
                        value={formData.sustancia_activa} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Ej: Ácido acetilsalicílico"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gramaje</label>
                        <input 
                            type="text" 
                            name="gramaje"
                            value={formData.gramaje} 
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="Ej: 500mg"
                        />
                    </div>
                    <div className="w-24">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                        <input 
                            type="number" 
                            name="cantidad"
                            min="1"
                            value={formData.cantidad} 
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Caducidad</label>
                    <input 
                        type="date" 
                        name="fecha_caducidad"
                        value={formData.fecha_caducidad} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-700"
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full mt-6 bg-primary text-white py-4 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-primary/30 active:scale-95 transition-transform"
                >
                    <Save className="mr-2 h-5 w-5" /> Guardar en Botiquín
                </button>
            </form>
        </div>
    );
};

export default MedicineForm;

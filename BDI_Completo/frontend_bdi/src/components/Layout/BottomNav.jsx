import React from 'react';
import { NavLink } from 'react-router-dom';
import { Pill, Activity, Scan, DollarSign, MapPin, LogOut } from 'lucide-react';

const BottomNav = ({ onLogout }) => {
    return (
        <div className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 pb-safe z-50">
            <div className="flex justify-around items-center h-16 max-w-xl mx-auto px-1">
                <NavItem to="/" icon={<Pill className="w-6 h-6" />} label="Botiquín" />
                <NavItem to="/voz" icon={<Activity className="w-6 h-6" />} label="Síntomas" />
                <NavItem 
                    to="/escaner" 
                    icon={<div className="bg-rose-400 text-white p-3 rounded-full shadow-md hover:bg-rose-500 transition-colors -mt-6"><Scan className="w-6 h-6" /></div>} 
                    label="Escanear" 
                />
                <NavItem to="/precios" icon={<DollarSign className="w-6 h-6" />} label="Precios" />
                <NavItem to="/farmacias" icon={<MapPin className="w-6 h-6" />} label="Farmacias" />
                
                {/* Botón de Cerrar Sesión integrado en la barra */}
                <button 
                    onClick={onLogout}
                    className="flex flex-col items-center justify-center w-14 gap-1 text-slate-400 hover:text-rose-500 transition-colors"
                >
                    <LogOut className="w-6 h-6" />
                    <span className="text-[9px] font-medium tracking-tight truncate w-full text-center">Salir</span>
                </button>
            </div>
        </div>
    );
};

const NavItem = ({ to, icon, label }) => {
    return (
        <NavLink 
            to={to}
            className={({ isActive }) => 
                `flex flex-col items-center justify-center w-14 gap-1 transition-colors ${isActive && label !== 'Escanear' ? 'text-blue-500' : 'text-slate-400 hover:text-slate-600'}`
            }
        >
            {icon}
            <span className="text-[9px] font-medium tracking-tight truncate w-full text-center">{label}</span>
        </NavLink>
    );
};

export default BottomNav;

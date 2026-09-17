import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componentes Nuevos (Míos)
import BottomNav from './components/Layout/BottomNav';
import AuthGoogleLogin from './components/Auth/GoogleLogin';
import { loginWithGoogle } from './services/api';

// Componentes y Páginas Originales (Tuyos)
// Navigation y HomePage eliminados según instrucciones
import EscanerPage from './pages/EscanerPage';
import MapaFarmaciasPage from './pages/MapaFarmaciasPage';
import CapturaVozPage from './pages/CapturaVozPage';
import ComparativaPreciosPage from './pages/ComparativaPreciosPage';
import BotiquinPage from './pages/BotiquinPage';

// Vistas Placeholder para nuevas secciones
const ProfileView = ({ onLogout }) => (
    <div className="p-6 flex flex-col items-center justify-center h-[70vh]">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Perfil</h1>
        <button onClick={onLogout} className="bg-red-50 text-red-600 px-6 py-3 rounded-full font-semibold active:scale-95 transition-transform">Cerrar Sesión</button>
    </div>
);



const App = () => {
    // Inicializar el estado de autenticación leyendo de localStorage
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('bdi_isAuthenticated') === 'true';
    });

    const handleLoginSuccess = async (credentialResponse) => {
        try {
            const response = await loginWithGoogle(credentialResponse.credential);
            const { token } = response;
            localStorage.setItem('bdi_token', token);
            localStorage.setItem('bdi_isAuthenticated', 'true');
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error al autenticar con el servidor:", error);
            alert("No se pudo iniciar sesión. Verifica tu conexión.");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('bdi_isAuthenticated');
        localStorage.removeItem('bdi_token');
    };

    if (!isAuthenticated) {
        return <AuthGoogleLogin onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <Router>
            <div className="min-h-screen bg-slate-50 font-sans pb-20">
                {/* Se eliminó Navigation de escritorio para usar BottomNav en todo */}
                
                <main className="max-w-7xl mx-auto md:py-6 sm:px-6 lg:px-8">
                    <Routes>
                        {/* Rutas Principales */}
                        <Route path="/" element={<BotiquinPage />} />
                        <Route path="/botiquin" element={<Navigate to="/" />} />
                        <Route path="/escaner" element={<EscanerPage />} />
                        <Route path="/farmacias" element={<MapaFarmaciasPage />} />
                        <Route path="/voz" element={<CapturaVozPage />} />
                        <Route path="/precios" element={<ComparativaPreciosPage />} />

                        {/* Perfil */}
                        <Route path="/perfil" element={<ProfileView onLogout={handleLogout} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
                
                {/* Navbar unificada (Móvil y Desktop) */}
                <BottomNav onLogout={handleLogout} />
            </div>
        </Router>
    );
};

export default App;

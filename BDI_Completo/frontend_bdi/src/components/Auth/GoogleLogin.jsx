import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Plus } from 'lucide-react';
import loginImage from '../../assets/login.webp';

const clientId = "383643612530-cj40gd2ndb6cqikav2bb0ja7c4rq9nfg.apps.googleusercontent.com";

const AuthGoogleLogin = ({ onLoginSuccess }) => {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="min-h-screen bg-slate-50 flex items-center justify-center w-full">
                <div className="flex flex-col w-full h-[100dvh] max-w-md mx-auto overflow-hidden bg-white shadow-2xl sm:h-[850px] sm:max-h-[95vh] sm:rounded-3xl">
                
                {/* --- SECCIÓN SUPERIOR: Fondo Azul y Personaje --- */}
                <div className="relative flex-1 bg-[#497dfe] flex items-end justify-center overflow-hidden">
                    
                    {/* Círculos decorativos de fondo */}
                    <div className="absolute top-[10%] left-[15%] w-24 h-24 bg-white/10 rounded-full"></div>
                    <div className="absolute top-[20%] right-[10%] w-12 h-12 bg-white/10 rounded-full"></div>
                    <div className="absolute bottom-[25%] -left-[10%] w-40 h-40 bg-white/10 rounded-full"></div>
                    <div className="absolute bottom-[15%] right-[15%] w-16 h-16 bg-white/10 rounded-full"></div>
                    
                    {/* Imagen del personaje anclada al fondo de esta sección */}
                    <img 
                        src={loginImage} 
                        alt="Doctora" 
                        className="relative z-10 w-[95%] max-w-[360px] h-[90%] object-contain object-bottom pointer-events-none"
                    />
                </div>

                {/* --- SECCIÓN INFERIOR: Textos y Botón en blanco --- */}
                <div className="shrink-0 bg-white flex flex-col items-center justify-start px-8 pt-8 pb-10 z-20">
                    
                    {/* Título Principal */}
                    <h1 className="text-3xl sm:text-4xl font-black text-[#2e2b3c] tracking-wider uppercase mb-3 text-center leading-tight">
                        Botiquín Digital
                    </h1>
                    
                    {/* Línea Divisoria */}
                    <div className="w-16 h-[3px] bg-slate-300 rounded-full mb-5"></div>
                    
                    {/* Subtítulo */}
                    <p className="text-sm sm:text-base text-slate-500 text-center leading-relaxed max-w-[280px] mb-8 font-medium">
                        Administra tus medicamentos, compara precios y encuentra farmacias cercanas desde la comodidad de tu dispositivo.
                    </p>

                    {/* Botón CTA Azul */}
                    <div className="relative w-full max-w-[240px] h-14 bg-[#497dfe] rounded-full shadow-lg shadow-blue-200/50 flex items-center justify-center hover:bg-[#3b6aec] transition-all hover:scale-105">
                        
                        {/* Iframe de Google oculto encima */}
                        <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full opacity-0 cursor-pointer">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    if (onLoginSuccess) {
                                        onLoginSuccess(credentialResponse);
                                    }
                                }}
                                onError={() => console.log('Login Failed')}
                                type="standard"
                                width="250"
                            />
                        </div>
                        
                        <span className="text-sm font-bold tracking-widest text-white uppercase pointer-events-none">
                            Comenzar
                        </span>
                    </div>
                </div>

                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default AuthGoogleLogin;
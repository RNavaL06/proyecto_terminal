import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, CheckCircle, Loader2 } from 'lucide-react';
import { scanMedicineLLM } from '../../services/api';

const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: "environment" // Usa la cámara trasera por defecto
};

const CameraCapture = ({ onDataExtracted }) => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState('');

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    }, [webcamRef]);

    const retake = () => {
        setImage(null);
        setError('');
    };

    const processImage = async () => {
        if (!image) return;
        setIsScanning(true);
        setError('');
        try {
            const result = await scanMedicineLLM(image);
            if (result.success && onDataExtracted) {
                onDataExtracted(result.data);
            }
        } catch (err) {
            setError('Error al procesar la imagen con IA. Intenta de nuevo.');
            console.error(err);
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4 bg-gray-50 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Escanear Medicamento</h2>
            
            <div className="relative w-full aspect-[3/4] bg-black rounded-xl overflow-hidden shadow-inner mb-4">
                {!image ? (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <img src={image} alt="Captura" className="w-full h-full object-cover" />
                )}

                {/* Overlay guides */}
                {!image && (
                    <div className="absolute inset-0 pointer-events-none border-2 border-white/30 m-8 rounded-lg flex items-center justify-center">
                        <span className="text-white/50 text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Enfoca la caja aquí</span>
                    </div>
                )}
            </div>

            {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

            <div className="flex gap-4 w-full">
                {!image ? (
                    <button 
                        onClick={capture}
                        className="flex-1 bg-primary text-white py-4 rounded-xl flex items-center justify-center font-semibold text-lg shadow-lg shadow-primary/30 active:scale-95 transition-transform"
                    >
                        <Camera className="mr-2 h-6 w-6" /> Capturar
                    </button>
                ) : (
                    <>
                        <button 
                            onClick={retake}
                            disabled={isScanning}
                            className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl flex items-center justify-center font-medium active:scale-95 transition-transform disabled:opacity-50"
                        >
                            <RefreshCw className="mr-2 h-5 w-5" /> Repetir
                        </button>
                        <button 
                            onClick={processImage}
                            disabled={isScanning}
                            className="flex-1 bg-secondary text-white py-4 rounded-xl flex items-center justify-center font-semibold shadow-lg shadow-secondary/30 active:scale-95 transition-transform disabled:opacity-50"
                        >
                            {isScanning ? (
                                <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Analizando...</>
                            ) : (
                                <><CheckCircle className="mr-2 h-5 w-5" /> Extraer Datos</>
                            )}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CameraCapture;

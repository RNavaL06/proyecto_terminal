const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicializamos el cliente con la variable de entorno
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const procesarReceta = async (req, res) => {
    const { imagenBase64 } = req.body;

    if (!imagenBase64) {
        return res.status(400).json({
            exito: false,
            mensaje: "Se requiere la imagen de la receta en formato Base64."
        });
    }

    // Limpiamos el prefijo de la imagen en caso de que venga del frontend
    const base64Limpia = imagenBase64.replace(/^data:image\/[a-z]+;base64,/, "");

    try {
        // Usamos el modelo Flash: rápido, gratuito y con soporte de visión
        const model = genAI.getGenerativeModel({ 
            model: "gemini-3.1-flash-lite",
            // ESTA ES LA MAGIA: Forzamos la salida en JSON a nivel de configuración
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        const prompt = `Eres un asistente médico experto en reconocimiento óptico de caracteres (OCR). 
        Analiza la imagen adjunta y extrae ÚNICAMENTE la siguiente información clínica utilizando este esquema JSON:
        {
            "nombre_paciente": "Nombre completo o null",
            "nombre_medico": "Nombre del médico o null",
            "fecha": "Fecha de expedición o null",
            "cedula_profesional": "Cédula o null",
            "diagnostico": "Motivo de consulta o null",
            "indicaciones": "Cualquier indicación extra, reposo, dieta o cuidados generales (null si no aplica)",
            "medicamentos": [
                {
                    "nombre_comercial": "Nombre comercial",
                    "sustancia_activa": "Sustancia o null",
                    "dosis": "Concentración (ej. 500mg)",
                    "formato": "Tabletas, Jarabe, etc.",
                    "instrucciones_uso": "Indicaciones o frecuencia",
                    "fecha_caducidad": "Fecha o null"
                }
            ]
        }
        Regla: Respeta estrictamente los nombres de las llaves. Si un dato no es legible, usa null.`;

        // Preparamos el objeto de la imagen para Gemini
        const imagePart = {
            inlineData: {
                data: base64Limpia,
                mimeType: "image/jpeg" 
            },
        };

        // Ejecutamos la petición enviando el texto y la imagen simultáneamente
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const textoRespuesta = response.text();

        // Como forzamos el MimeType, el parseo es seguro y directo
        const recetaExtraida = JSON.parse(textoRespuesta);

        return res.status(200).json({
            exito: true,
            mensaje: "Documento procesado con éxito",
            datos_clinicos: recetaExtraida
        });

    } catch (error) {
        console.error("Error al procesar la imagen con Gemini:", error);
        
        return res.status(500).json({
            exito: false,
            mensaje: "Error interno al comunicarse con el motor de visión."
        });
    }
};

module.exports = { procesarReceta };
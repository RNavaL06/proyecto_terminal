const { GoogleGenAI } = require('@google/genai');

// Inicializar el SDK con la API Key (Asegúrate de que esté en el .env)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const scanMedicineBox = async (req, res) => {
    try {
        const { imageBase64 } = req.body; // Se espera recibir la imagen en base64

        if (!imageBase64) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
        }

        // Limpiar el prefijo data:image/...;base64, si existe
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

        const prompt = `Analiza esta imagen de una caja de medicamento. 
Extrae la siguiente información y devuélvela ESTRICTAMENTE en este formato JSON:
{
  "nombre_medicamento": "Nombre comercial",
  "sustancia_activa": "Nombre de la sustancia",
  "gramaje": "Ej: 500mg"
}
Si algún dato no es visible, pon "No detectado". No incluyas ningún texto fuera del JSON.`;

        const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: [
                prompt,
                { inlineData: { data: base64Data, mimeType: 'image/jpeg' } }
            ]
        });

        const responseText = response.text;
        
        // Limpiar posibles bloques de código Markdown que Gemini a veces añade
        const cleanJsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const extractedData = JSON.parse(cleanJsonStr);

        res.status(200).json({
            success: true,
            data: extractedData
        });

    } catch (error) {
        console.error('Error al analizar la imagen con Gemini:', error);
        res.status(500).json({ error: 'Hubo un error al procesar la imagen.', details: error.message });
    }
};

module.exports = {
    scanMedicineBox
};

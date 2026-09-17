// Importamos la nueva función desde el servicio
const { buscarSugerenciasDireccion } = require('../services/geoapifyService');

const obtenerSugerencias = async (req, res) => {
    try {
        const { texto } = req.query;

        // Validar que venga el texto
        if (!texto) {
            return res.json([]);
        }

        // Llamamos al servicio, delegando toda la lógica de Axios y Geoapify
        const sugerencias = await buscarSugerenciasDireccion(texto);

        // Respondemos al frontend
        res.json(sugerencias);
    } catch (error) {
        console.error('Error en el controlador de ubicaciones:', error.message);
        res.status(500).json({ error: 'Error al procesar la solicitud de autocompletado.' });
    }
};

module.exports = {
    obtenerSugerencias
};
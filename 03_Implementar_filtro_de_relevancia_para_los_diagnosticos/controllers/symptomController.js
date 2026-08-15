const { buscarDiagnosticos } = require('../utils/mapearSintomas');
const { aplicarFiltroRelevancia } = require('../utils/filtroRelevancia');

const analizarSintomas = async (req, res) => {
    const { frase } = req.body;

    // Validación básica
    if (!frase || typeof frase !== 'string') {
        return res.status(400).json({ 
            exito: false, 
            mensaje: "Debes proporcionar una 'frase' válida en el cuerpo de la petición." 
        });
    }

    try {
        const extraccion = await buscarDiagnosticos(frase);

        if (extraccion.resultadosBrutos.length === 0) {
            return res.status(404).json({
                exito: false,
                mensaje: "No se encontraron coincidencias médicas para los síntomas descritos.",
                resultados: []
            });
        }

        const resultadosFinales = aplicarFiltroRelevancia(
            extraccion.resultadosBrutos, 
            extraccion.entidadesDetectadas
        );

        // Devolvemos el arreglo de resultados
        return res.status(200).json({
            exito: true,
            mensaje: "Análisis completado con éxito",
            resultados: resultadosFinales
        });

    } catch (error) {
        console.error("Error en el controlador de síntomas:", error);
        return res.status(500).json({ 
            exito: false, 
            mensaje: "Error interno del servidor al procesar los síntomas." 
        });
    }
};

module.exports = {
    analizarSintomas
};
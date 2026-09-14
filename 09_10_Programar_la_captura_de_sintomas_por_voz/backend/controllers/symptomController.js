const { TokenizerEs } = require('@nlpjs/lang-es');
const { buscarDiagnosticos } = require('../utils/mapearSintomas');
const { aplicarFiltroRelevancia } = require('../utils/filtroRelevancia');
const pool = require('../config/db');

const analizarSintomas = async (req, res) => {
    const { frase } = req.body;
    const idUsuario = req.usuario ? req.usuario.id : null;
    const tokenizer = new TokenizerEs(); // Instancia de Tokenizer para español

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
                resultados: [],
                historial: []
            });
        }

        const resultadosFinales = aplicarFiltroRelevancia(
            extraccion.resultadosBrutos, 
            extraccion.entidadesDetectadas
        );

        // EXTRAER HISTORIAL MÉDICO DE LA BD (Filtrado por Diagnóstico Actual)
        let historialReal = [];
        const terminosEncontrados = resultadosFinales.map(d => d.termino_medico);

        if (idUsuario && terminosEncontrados.length > 0) {
            try {
                // Traemos todo el historial reciente del paciente
                const [rows] = await pool.query(`
                    SELECT 
                        m.nombre_comercial AS medicamento,
                        m.cantidad_disponible,
                        r.diagnostico
                    FROM recetas r
                    JOIN medicamentos m ON r.id_receta = m.id_receta
                    WHERE r.id_usuario = ?
                    ORDER BY r.fecha_expedicion DESC
                `, [idUsuario]);
                
                // Filtramos de forma flexible en JavaScript usando node-nlp
                historialReal = rows.filter(receta => {
                    if (!receta.diagnostico) return false;
                    
                    // Usamos la librería para tokenizar
                    const cleanReceta = tokenizer.tokenize(receta.diagnostico).map(w => w.toLowerCase()).filter(w => w.length > 3);
                    
                    return terminosEncontrados.some(termino => {
                        const cleanIA = tokenizer.tokenize(termino).map(w => w.toLowerCase()).filter(w => w.length > 3);
                        return cleanIA.some(word => cleanReceta.includes(word));
                    });
                });
                
            } catch (dbError) {
                console.error("Error al extraer historial filtrado:", dbError);
            }
        }

        // Devolvemos el arreglo de resultados
        return res.status(200).json({
            exito: true,
            mensaje: "Análisis completado con éxito",
            resultados: resultadosFinales,
            historial: historialReal
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
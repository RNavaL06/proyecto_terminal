const { NlpManager } = require('node-nlp');
const pool = require('../config/db'); 

// Inicializamos el manager enfocándonos en el motor NER para español
const manager = new NlpManager({ languages: ['es'], forceNER: true, nlu: { log: false } });

/**
 * Alimentamos el motor NER con nuestro catálogo desde MySQL
 */
const inicializarMotorNLP = async () => {
    try {
        console.log("Cargando catálogo médico desde MySQL...");
        
        // Obtenemos los diagnósticos de la base de datos
        const [diagnosticos] = await pool.query('SELECT codigo_cie10, keywords FROM catalogo_cie10');

        // Alimentamos el motor NER con los datos de la DB
        diagnosticos.forEach(diagnostico => {
            const idEntidad = diagnostico.codigo_cie10; 
            
            // La librería mysql2 parsea automáticamente el campo JSON, 
            // por lo que diagnostico.keywords ya es un arreglo usable.
            manager.addNamedEntityText(
                idEntidad, 
                idEntidad, 
                ['es'], 
                diagnostico.keywords
            );
        });

        console.log("Motor NLP entrenado y listo para mapear síntomas.");
    } catch (error) {
        console.error("Error al inicializar el motor NLP:", error);
    }
};

/**
 * FUNCIÓN PRINCIPAL DE BÚSQUEDA
 */
const buscarDiagnosticos = async (fraseUsuario) => {
    // Procesamiento de síntomas, tokeniza, ignora ruido y busca las entidades
    const analisis = await manager.process('es', fraseUsuario);

    // Si no encontró ninguna entidad clínica en la frase, retornamos vacío
    if (!analisis.entities || analisis.entities.length === 0) {
        return [];
    }

    // Extracción de códigos CIE-10 y eliminación de duplicados
    const codigosEncontrados = [...new Set(analisis.entities.map(hallazgo => hallazgo.entity))];

    try {
        // Filtración de los datos obtenidos desde la BD para devolver los objetos completos
        // Usamos la cláusula IN (?) para buscar múltiples códigos a la vez de forma eficiente
        const [resultadosBrutos] = await pool.query(
            'SELECT termino_medico, codigo_cie10, keywords FROM catalogo_cie10 WHERE codigo_cie10 IN (?)',
            [codigosEncontrados]
        );

        // Retornamos el arreglo bruto y las entidades más importantes
        return {
            resultadosBrutos,
            entidadesDetectadas: analisis.entities
        };
    } catch (error) {
        console.error("Error en la base de datos al buscar diagnósticos:", error);
        return [];
    }
};

module.exports = {
    inicializarMotorNLP,
    buscarDiagnosticos,
    manager 
};
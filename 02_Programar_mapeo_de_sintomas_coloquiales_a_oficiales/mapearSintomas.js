const { NlpManager } = require('node-nlp');
const cie10Data = require('./cie10Mock.json');

// Inicializamos el manager enfocándonos en el motor NER para español
const manager = new NlpManager({ languages: ['es'], forceNER: true, nlu: { log: false } });


//  Alimentamos el motor NER con nuestro catálogo
cie10Data.forEach(diagnostico => {
    // Usamos el código CIE-10 como identificador único de la entidad
    const idEntidad = diagnostico.codigo_cie10; 
    
    // Le enseñamos a la IA qué palabras detonan esta entidad
    manager.addNamedEntityText(
        idEntidad, 
        idEntidad, 
        ['es'], 
        diagnostico.keywords
    );
});


const buscarDiagnosticos = async (fraseUsuario) => {
    // Procesamiento de síntomas, tokeniza, ignora ruido y busca las entidades
    const analisis = await manager.process('es', fraseUsuario);

    // Si no encontró ninguna entidad clínica en la frase, retornamos vacío
    if (!analisis.entities || analisis.entities.length === 0) {
        return [];
    }

    // Extracción de códigos CIE-10 y eliminación de duplicados
    // analisis.entities es un arreglo generado por node-nlp con sus hallazgos
    const codigosEncontrados = [...new Set(analisis.entities.map(hallazgo => hallazgo.entity))];

    // Filtración de los datos obtenidos desde la BD para devolver los objetos completos
    const resultadosBrutos = cie10Data.filter(diagnostico => 
        codigosEncontrados.includes(diagnostico.codigo_cie10)
    );

    // Retornamos el arreglo bruto (sin scoring, respetando tu Fase 1)
    return resultadosBrutos;
};

module.exports = {
    buscarDiagnosticos,
    manager // Exportamos el manager para poder visualizar sus procesos internos en la demo
};
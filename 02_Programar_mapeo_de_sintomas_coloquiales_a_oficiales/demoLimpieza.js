// Importamos el manager de nuestro módulo principal
const { manager } = require('./mapearSintomas');

(async () => {
    console.log("\n");

    // Definimos una frase de prueba compleja (con signos de exclamación, comas, acentos y mayúsculas)
    const textoOriginal = "¡Ay! Me duele muchísimo la cabeza, y tengo un fuerte dolor en la panza.";
    console.log("Texto ingresado por la persona usuaria:");
    console.log(`   "${textoOriginal}"\n`);

    // El motor de node-nlp procesa toda la frase en una sola ejecución asíncrona
    const analisis = await manager.process('es', textoOriginal);

    // Aplicamos minúsculas y eliminamos acentos (ahora gestionado internamente por el motor NLP)
    console.log("Aplicando normalización interna de node-nlp (Minúsculas y manejo de acentos):");
    // node-nlp guarda la frase original en 'utterance', demostramos cómo la estandariza
    console.log(`   "${analisis.utterance.toLowerCase()}"\n`);

    // Utilizamos el tokenizador de la librería para extraer bloques de letras
    // Esto descarta automáticamente las comas, los signos de exclamación y los espacios.
    console.log("Aplicando Tokenización de node-nlp (Extraer palabras puras descartando comas,signos de exclamación y espacios):");
    console.log(`   Arreglo obtenido:`, analisis.tokens, `\n`);

    // Filtramos el arreglo mediante el motor de Reconocimiento de Entidades (NER)
    // Extraemos únicamente el texto original (sourceText) de las entidades que la IA logró identificar,
    // ignorando por completo el "ruido clínico" y las stop words nativas.
    const resultadoFinal = analisis.entities.map(entidad => entidad.sourceText);

    console.log("Aplicando Motor NER de node-nlp (Filtro de Stop Words y Extracción de palabras clave):");
    console.log(`   Resultado final:`, resultadoFinal, `\n`);

    console.log("");
})();
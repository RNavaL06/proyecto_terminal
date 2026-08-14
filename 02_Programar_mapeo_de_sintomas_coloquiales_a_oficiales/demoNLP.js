const { buscarDiagnosticos, manager } = require('./mapearSintomas');

(async () => {
    console.log("\n");

    const fraseUsuario = "¡Ay! Me duele muchísimo la cabeza, y tengo un fuerte dolor en la panza.";
    
    console.log("Texto ingresado por la persona usuaria:");
    console.log(`   "${fraseUsuario}"\n`);

    // Hacemos un análisis crudo solo para imprimir en consola cómo razona la IA
    const analisisInterno = await manager.process('es', fraseUsuario);
    const extraccion = analisisInterno.entities.map(e => `'${e.sourceText}' -> Entidad [${e.entity}]`);
    
    console.log("Limpieza de texto (Ignorando ruido y conectores):");
    console.log(`   [ ${extraccion.join(', ')} ]\n`);

    console.log("Arreglo de concidencias de síntomas coloquiales a términos médicos:\n");

    const diagnosticos = await buscarDiagnosticos(fraseUsuario);

    if (diagnosticos.length === 0) {
        console.log("   Ninguna coincidencia encontrada.");
    } else {
        console.log(diagnosticos);
    }
    
    console.log("\n");
})();
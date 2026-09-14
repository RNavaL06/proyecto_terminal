
// Aplica las reglas para calcular relevancia, filtrar, ordenar y limitar diagnósticos.
 
const aplicarFiltroRelevancia = (diagnosticosBrutos, entidadesDetectadas) => {
    // Calcular Scoring
    const diagnosticosConPuntaje = diagnosticosBrutos.map(diagnostico => {
        // Encontramos qué palabras (entidades) detonaron este diagnóstico en particular
        const entidadesMatch = entidadesDetectadas.filter(e => e.entity === diagnostico.codigo_cie10);
        
        // Sumamos el nivel de certeza (accuracy) que la IA le dio a esas palabras
        let sumaAccuracy = 0;
        entidadesMatch.forEach(e => {
            sumaAccuracy += e.accuracy;
        });
        
        // Calculamos el promedio y lo convertimos a porcentaje (0 a 100)
        let porcentajeCerteza = 0;
        if (entidadesMatch.length > 0) {
            porcentajeCerteza = (sumaAccuracy / entidadesMatch.length) * 100;
        }

        return {
            ...diagnostico,
            probabilidad: Math.round(porcentajeCerteza), // Redondeamos para tener un entero limpio
            numero_coincidencias: entidadesMatch.length /// Guardamos cuántas palabras clave detonaron este diagnóstico
        };
    });

    // Eliminamos cualquier diagnóstico menor al 50% de probabilidad
    const diagnosticosFiltrados = diagnosticosConPuntaje.filter(d => d.probabilidad >= 50);

    // Ordenar con el doble criterio de ordenamiento, es decir, un desempate
    diagnosticosFiltrados.sort((a, b) => {
        // Primero intentamos ordenar por probabilidad (mayor a menor)
        if (b.probabilidad !== a.probabilidad) {
            return b.probabilidad - a.probabilidad;
        }
        // Desempate; si tienen el mismo porcentaje, ordenamos por número de coincidencias
        return b.numero_coincidencias - a.numero_coincidencias;
    });

    // Extraemos únicamente el Top 3
    const top3Diagnosticos = diagnosticosFiltrados.slice(0, 3);

    return top3Diagnosticos;
};

module.exports = { aplicarFiltroRelevancia };
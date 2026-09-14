const axios = require('axios');

async function testNLP() {
    const frases = [
        "Traigo mucha diarrea desde en la mañana y me duele la panza.",
        "Siento mucho dolor al orinar y ardor."
    ];

    for (let frase of frases) {
        try {
            const response = await axios.post('http://localhost:3001/api/sintomas/analizar', { frase }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzg3MjI4NTUyLCJleHAiOjE3ODc1MDIxNTJ9.rvzhL02R_vRWqjaQF92Ua3u9poSf6vmH6wiJwieuzWs`
                }
            });
            console.log(`\nFrase: "${frase}"`);
            console.log("Resultados NLP:", response.data.resultados.map(r => r.termino_medico));
        } catch (e) {
            console.error("Error:", e.message);
        }
    }
}

testNLP();

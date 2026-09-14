const pool = require('./config/db');

async function getDiagnoses() {
    try {
        const [rows] = await pool.query('SELECT DISTINCT diagnostico FROM recetas WHERE id_usuario = 1');
        console.log("Diagnosticos en BD:", rows.map(r => r.diagnostico));
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}

getDiagnoses();

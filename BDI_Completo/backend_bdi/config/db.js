const mysql = require('mysql2/promise');

// Para esta prueba aislada, puedes colocar las credenciales directas 
// o usar dotenv si prefieres mantener la seguridad.
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bdi_database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
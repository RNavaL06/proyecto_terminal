const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        // Verificar el token con Google
        const ticket = await client.verifyIdToken({ 
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub: googleId, email, name = 'Usuario BDI' } = payload;

        // Buscar o crear el usuario en MySQL
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE google_id = ?', [googleId]);
        let userId;

        if (rows.length > 0) {
            userId = rows[0].id_usuario; 
        } else {
            const [result] = await pool.query(
                'INSERT INTO usuarios (google_id, correo_electronico, nombre_completo) VALUES (?, ?, ?)',
                [googleId, email, name]
            );
            userId = result.insertId;
        }

        // Generar JWT para la sesión de la API
        const apiToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '76h' });

        res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token: apiToken });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Token de Google inválido o expirado' });
    }
};

module.exports = { googleLogin };
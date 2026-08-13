const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Obtenemos el header de autorización
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Se requiere un token de autenticación para acceder a este recurso' });
    }

    try {
        // Verificamos el token usando la misma clave secreta con la que se firmó
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Inyectamos la información del token decodificado en la respuesta "req"
        req.usuario = decoded; 
        
        // Pasamos al siguiente middleware o controlador
        next();
    } catch (error) {
        return res.status(401).json({ 
            error: 'Token inválido o expirado' 
        });
    }
};

module.exports = { verifyToken };
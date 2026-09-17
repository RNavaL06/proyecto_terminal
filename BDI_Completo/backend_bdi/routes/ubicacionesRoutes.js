const express = require('express');
const router = express.Router();
const { obtenerSugerencias } = require('../controllers/ubicacionesController');
const { verifyToken } = require('../middlewares/authMiddleware');

//middleware de seguridad para todas las rutas de este archivo
router.use(verifyToken);

// Definir la ruta solicitada
router.get('/sugerencias', obtenerSugerencias);

module.exports = router;
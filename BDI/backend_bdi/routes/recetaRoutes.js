const express = require('express');
const router = express.Router();
const { procesarReceta, guardarReceta } = require('../controllers/recetaController');
const { verifyToken } = require('../middlewares/authMiddleware');

// POST /api/recetas/analizar
router.post('/analizar', verifyToken, procesarReceta);

// POST /api/recetas/guardar (Guardado transaccional en MySQL)
router.post('/guardar', verifyToken, guardarReceta);

module.exports = router;
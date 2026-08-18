const express = require('express');
const router = express.Router();
const { procesarReceta } = require('../controllers/recetaController');
const { verifyToken } = require('../middlewares/authMiddleware');

// POST /api/recetas/analizar
router.post('/analizar', verifyToken, procesarReceta);

module.exports = router;
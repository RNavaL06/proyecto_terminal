const express = require('express');
const router = express.Router();
const { analizarSintomas } = require('../controllers/symptomController');
const { verifyToken } = require('../middlewares/authMiddleware');

// POST /api/sintomas/analizar
router.post('/analizar', verifyToken, analizarSintomas);

module.exports = router;
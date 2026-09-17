const express = require('express');
const router = express.Router();
const { getFarmacias } = require('../controllers/farmaciaController');
const { verifyToken } = require('../middlewares/authMiddleware');

//middleware de seguridad para todas las rutas de este archivo
router.use(verifyToken);

router.get('/', getFarmacias);

module.exports = router;
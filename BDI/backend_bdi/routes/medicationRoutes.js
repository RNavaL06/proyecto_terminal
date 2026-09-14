const express = require('express');
const router = express.Router();

// controllers
const { addMedication, getMedications, updateMedication, deleteMedication } = require('../controllers/medicationController');

// middlewares
const { validateMedication } = require('../middlewares/validators');
const { verifyToken } = require('../middlewares/authMiddleware');

//middleware de seguridad para todas las rutas de este archivo
router.use(verifyToken);

// POST /api/botiquin
router.post('/', validateMedication, addMedication);  

// GET /api/botiquin         
router.get('/', getMedications);    

// PUT /api/botiquin/:id                           
router.put('/:id', validateMedication, updateMedication);   

// DELETE /api/botiquin/:id
router.delete('/:id', deleteMedication);                       

module.exports = router;
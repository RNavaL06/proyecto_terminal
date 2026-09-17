const { body, validationResult } = require('express-validator');

// Middleware para capturar los errores de validación
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }
    next();
};

// Validaciones para el Botiquín (Medicamentos)
const validateMedication = [
    body('nombre_comercial').notEmpty().withMessage('El nombre del medicamento es obligatorio').isString(),
    body('dosis').notEmpty().withMessage('La dosis es obligatoria'),
    body('cantidad_disponible').isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor a 0'),
    body('fecha_caducidad').isISO8601().toDate().withMessage('Formato de fecha inválido (usa YYYY-MM-DD)'),
    validateRequest
];

// Validación para el token de Google
const validateGoogleLogin = [
    body('token').notEmpty().withMessage('El token de Google es obligatorio'),
    validateRequest
];

module.exports = { validateMedication, validateGoogleLogin };
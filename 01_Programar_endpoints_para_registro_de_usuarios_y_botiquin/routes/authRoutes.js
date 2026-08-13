const express = require('express');
const router = express.Router();

// controllers
const { googleLogin } = require('../controllers/authController');

// middlewares
const { validateGoogleLogin } = require('../middlewares/validators');

//POST /api/auth/google
router.post('/google', validateGoogleLogin, googleLogin);

module.exports = router;
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// routes
const authRoutes = require('./routes/authRoutes');
const medicationRoutes = require('./routes/medicationRoutes');

app.use(cors());

// middlewares
app.use(express.json());

// rutas para la api
app.use('/api/auth', authRoutes);
app.use('/api/botiquin', medicationRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint no encontrado' 
    });
});

// inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor BDI corriendo en el puerto ${PORT}`);
});
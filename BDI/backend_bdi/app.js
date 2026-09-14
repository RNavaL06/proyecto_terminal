const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const symptomRoutes = require('./routes/symptomRoutes');
const recetaRoutes = require('./routes/recetaRoutes');
const ubicacionesRoutes = require('./routes/ubicacionesRoutes');
const farmaciaRoutes = require('./routes/farmaciaRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/botiquin', medicationRoutes);
app.use('/api/sintomas', symptomRoutes);
app.use('/api/recetas', recetaRoutes);
app.use('/api/ubicaciones', ubicacionesRoutes);
app.use('/api/farmacias', farmaciaRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
});

const PORT = process.env.PORT || 3000;

// If we need to initialize NLP engine
const { inicializarMotorNLP } = require('./utils/mapearSintomas');

const arrancarServidor = async () => {
    try {
        console.log("Inicializando motor NLP...");
        await inicializarMotorNLP();
        console.log("Motor NLP inicializado correctamente.");
    } catch (error) {
        console.error("Error al inicializar motor NLP:", error.message);
    }

    app.listen(PORT, () => {
        console.log(`Servidor BDI (Unificado) corriendo en el puerto ${PORT}`);
    });
};

arrancarServidor();

const express = require('express');
const { inicializarMotorNLP } = require('./utils/mapearSintomas');
const symptomRoutes = require('./routes/symptomRoutes');

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/sintomas', symptomRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
});

const PORT = 3000;

// Inicialización asíncrona: Entrenar IA y luego levantar el servidor
const arrancarServidor = async () => {
    // Entrenar el modelo con la BD
    await inicializarMotorNLP();
    
    // Abrir el puerto
    app.listen(PORT, () => {
        console.log(`Servidor de la Actividad 2 corriendo en el puerto ${PORT}`);
    });
};

arrancarServidor();
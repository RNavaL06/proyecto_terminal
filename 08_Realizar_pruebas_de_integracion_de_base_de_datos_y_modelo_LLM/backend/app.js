const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();


const recetaRoutes = require('./routes/recetaRoutes');

app.use(cors());

// Middlewares
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rutas
app.use('/api/recetas', recetaRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
});

const PORT = 3000;

// levantar el servidor
const arrancarServidor = async () => {
    
    // Abrir el puerto
    app.listen(PORT, () => {
        console.log(`Servidor de la Actividad 4 corriendo en el puerto ${PORT}`);
    });
};

arrancarServidor();
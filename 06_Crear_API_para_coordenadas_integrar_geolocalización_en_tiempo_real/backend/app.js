const express = require('express');
const cors = require('cors');
const farmaciaRoutes = require('./routes/farmaciaRoutes');
require('dotenv').config();

const app = express();
app.use(cors());

// Inyectamos las rutas
app.use('/api/farmacias', farmaciaRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`API corriendo en el puerto ${PORT}`));
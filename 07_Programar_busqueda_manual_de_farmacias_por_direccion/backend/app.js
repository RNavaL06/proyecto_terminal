const express = require('express');
const cors = require('cors');
const farmaciaRoutes = require('./routes/farmaciaRoutes');
const ubicacionesRoutes = require('./routes/ubicacionesRoutes');
require('dotenv').config();

const app = express();
app.use(cors());

// Inyectamos las rutas
app.use('/api/farmacias', farmaciaRoutes);
app.use('/api/ubicaciones', ubicacionesRoutes)

const PORT = 3000;
app.listen(PORT, () => console.log(`API corriendo en el puerto ${PORT}`));
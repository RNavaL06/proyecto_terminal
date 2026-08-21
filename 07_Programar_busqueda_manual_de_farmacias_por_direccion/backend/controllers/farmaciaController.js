const { buscarFarmaciasCercanas } = require('../services/geoapifyService');

const getFarmacias = async (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ error: 'Faltan los parámetros lat y lng' });
    }

    try {
        const farmacias = await buscarFarmaciasCercanas(lat, lng);
        res.json(farmacias);
    } catch (error) {
        console.error('Error en controlador de farmacias:', error.message);
        res.status(500).json({ error: 'Error interno al buscar farmacias' });
    }
};

module.exports = { getFarmacias };
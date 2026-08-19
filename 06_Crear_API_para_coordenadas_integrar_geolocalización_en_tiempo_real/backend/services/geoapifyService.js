const axios = require('axios');

const buscarFarmaciasCercanas = async (lat, lng) => {
    // Pega aquí la llave que sacaste de la página de Geoapify
    const API_KEY = '5d49805e7b124e2f915289c504e631de';
    
    // OJO: Geoapify requiere que el orden en los filtros sea (longitud, latitud)
    const url = `https://api.geoapify.com/v2/places?categories=healthcare.pharmacy&filter=circle:${lng},${lat},3000&bias=proximity:${lng},${lat}&limit=20&apiKey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        
        // Geoapify devuelve un formato estándar llamado GeoJSON (features)
        let farmacias = response.data.features
            .filter(feature => feature.properties.name)
            .map(feature => ({
                id: feature.properties.place_id,
                nombre: feature.properties.name,
                lat: feature.properties.lat,
                lng: feature.properties.lon,
                distanciaMetros: feature.properties.distance,
                horario: feature.properties.opening_hours || 'Horario no especificado'
            }));

        // Ordenamos el arreglo de menor a mayor distancia usando JavaScript nativo
        farmacias.sort((a, b) => a.distanciaMetros - b.distanciaMetros);

        return farmacias;

    } catch (error) {
        console.error("Error consultando Geoapify:", error.message);
        throw new Error("No se pudieron obtener las farmacias");
    }
};

module.exports = { buscarFarmaciasCercanas };
 
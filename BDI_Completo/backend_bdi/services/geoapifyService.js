const axios = require('axios');
const API_KEY = process.env.GEOAPIFY_API_KEY; 
const buscarFarmaciasCercanas = async (lat, lng) => {
    
    const url = `https://api.geoapify.com/v2/places?categories=healthcare.pharmacy&filter=circle:${lng},${lat},3000&bias=proximity:${lng},${lat}&limit=20&apiKey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        
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

        farmacias.sort((a, b) => a.distanciaMetros - b.distanciaMetros);

        return farmacias;

    } catch (error) {
        console.error("Error consultando Geoapify:", error.message);
        throw new Error("No se pudieron obtener las farmacias");
    }
};

// NUEVA FUNCIÓN: Centralizamos la consulta de autocompletado aquí
const buscarSugerenciasDireccion = async (texto) => {
    
    // Incluimos el límite y el filtro de país para México
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(texto)}&limit=5&filter=countrycode:mx&apiKey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        
        // Transformamos y devolvemos la data limpia
        return response.data.features.map(feature => ({
            id: feature.properties.place_id,
            direccionFormateada: feature.properties.formatted,
            lat: feature.properties.lat,
            lng: feature.properties.lon 
        }));
    } catch (error) {
        console.error("Error consultando autocompletado en Geoapify:", error.message);
        throw new Error("No se pudieron obtener las sugerencias");
    }
};

// Exportamos ambas funciones
module.exports = { 
    buscarFarmaciasCercanas, 
    buscarSugerenciasDireccion 
};
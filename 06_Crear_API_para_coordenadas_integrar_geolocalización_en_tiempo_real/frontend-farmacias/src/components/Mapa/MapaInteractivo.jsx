import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// 1. ICONO DE USUARIO: Radar Azul
const svgUsuario = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="1" />
    <circle cx="12" cy="12" r="6" fill="#3b82f6" stroke="white" stroke-width="2" />
  </svg>
`;
const iconoUsuario = new L.divIcon({
  className: 'bg-transparent',
  html: `<div style="width: 28px; height: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${svgUsuario}</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
});

// 2. ICONO DE FARMACIA: Pin con Cruz Médica (Restaurado)
const svgFarmacia = `
  <svg viewBox="0 0 24 24" fill="#10b981" stroke="white" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <path d="M10.5 5.5h3v2.5h2.5v3h-2.5v2.5h-3v-2.5h-2.5v-3h2.5z" fill="white" stroke="none"/>
  </svg>
`;
const iconoFarmacia = new L.divIcon({
  className: 'bg-transparent',
  html: `<div style="width: 34px; height: 34px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">${svgFarmacia}</div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
});

export const MapaInteractivo = ({ ubicacion, farmacias }) => {
  if (!ubicacion) return null;

  return (
    <div className="w-full h-[50vh] md:h-full min-h-[400px] bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden relative z-0">
      <MapContainer 
        center={[ubicacion.lat, ubicacion.lng]}
        zoom={15} 
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Marcador del Usuario */}
        <Marker position={[ubicacion.lat, ubicacion.lng]} icon={iconoUsuario}>
          <Tooltip direction="top" offset={[0, -14]} className="font-bold text-blue-600 rounded-lg">Estás aquí</Tooltip>
        </Marker>

        {/* Marcadores de las Farmacias */}
        {farmacias.map((f, index) => (
          <Marker key={f.id} position={[f.lat, f.lng]} icon={iconoFarmacia}>
            
            <Tooltip direction="top" offset={[0, -30]} className="font-bold text-emerald-800 rounded-lg border-0 shadow-md">
              {f.nombre}
            </Tooltip>

            <Popup>
              <div className="text-center p-1 w-48">
                <span className="font-bold text-emerald-700 block mb-1 text-sm leading-tight">{f.nombre}</span>
                
                {f.direccion && <span className="text-xs text-gray-500 block mb-1">{f.direccion}</span>}
                {f.telefono && <span className="text-xs text-gray-500 block mb-2">📞 {f.telefono}</span>}

                <div className="flex items-center justify-center gap-2 mb-3 mt-2">
                  <span className="text-xs text-gray-600 font-medium">{f.distanciaMetros} m</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-emerald-600 font-semibold">{f.horario || 'Abierto'}</span>
                </div>
                
                {/* Botón de Google Maps */}
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${f.lat},${f.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-2 px-3 rounded-lg transition-colors text-xs text-decoration-none"
                >
                  <MapPin className="w-3 h-3" /> Cómo llegar
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
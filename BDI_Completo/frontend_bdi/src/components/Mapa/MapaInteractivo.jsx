
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react'; // <-- Se agregó Navigation
import 'leaflet/dist/leaflet.css';

const svgUsuario = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="1" /><circle cx="12" cy="12" r="6" fill="#3b82f6" stroke="white" stroke-width="2" /></svg>`;
const iconoUsuario = new L.divIcon({ className: 'bg-transparent', html: `<div style="width: 28px; height: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${svgUsuario}</div>`, iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] });

const svgFarmacia = `<svg viewBox="0 0 24 24" fill="#10b981" stroke="white" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><path d="M10.5 5.5h3v2.5h2.5v3h-2.5v2.5h-3v-2.5h-2.5v-3h2.5z" fill="white" stroke="none"/></svg>`;
const iconoFarmacia = new L.divIcon({ className: 'bg-transparent', html: `<div style="width: 34px; height: 34px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">${svgFarmacia}</div>`, iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -34] });

export const MapaInteractivo = ({ ubicacion, farmacias }) => {
  if (!ubicacion) return null;

  const nombreUbicacionCorto = ubicacion.nombre 
    ? (ubicacion.nombre.length > 25 ? ubicacion.nombre.substring(0, 25) + '...' : ubicacion.nombre)
    : 'Tu ubicación actual';

  return (
    <div className="w-full h-[50vh] md:h-full min-h-[400px] bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden relative z-0">
      <MapContainer 
        key={`${ubicacion.lat}-${ubicacion.lng}`}
        center={[ubicacion.lat, ubicacion.lng]}
        zoom={15} 
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Marcador del Usuario */}
        <Marker position={[ubicacion.lat, ubicacion.lng]} icon={iconoUsuario}>
          <Tooltip 
            permanent 
            direction="right" 
            offset={[12, 0]} 
            className="tooltip-transparente font-extrabold text-blue-600 text-sm whitespace-nowrap"
          >
            {nombreUbicacionCorto}
          </Tooltip>
        </Marker>

        {/* Marcadores de las Farmacias */}
        {farmacias.map((f) => {
          const nombreCorto = f.nombre.length > 18 ? f.nombre.substring(0, 18) + '...' : f.nombre;

          return (
            <Marker key={f.id} position={[f.lat, f.lng]} icon={iconoFarmacia}>
              <Tooltip 
                permanent 
                direction="right" 
                offset={[15, -15]} 
                className="tooltip-transparente font-extrabold text-emerald-800 text-sm whitespace-nowrap"
              >
                {nombreCorto}
              </Tooltip>

              {/* INTEGRACIÓN DEL NUEVO POPUP TIPO GOOGLE MAPS */}
              <Popup className="popup-google">
                <div className="flex flex-col w-full bg-white font-sans">
                  
                  {/* 1. Imagen de Portada */}
                  <div className="h-24 w-full bg-slate-200 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=300&h=120&q=80" 
                      alt="Fachada farmacia" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 2. Cuerpo de la Tarjeta */}
                  <div className="p-4 relative">
                    
                    {/* Botón Circular Flotante (Cómo llegar) */}
                    <div className="absolute -top-6 right-3">
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&origin=${ubicacion.lat},${ubicacion.lng}&destination=${f.lat},${f.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-blue-100 hover:bg-blue-200 flex items-center justify-center rounded-full shadow-md border border-white transition-colors"
                        title="Cómo llegar"
                      >
                        <Navigation className="w-6 h-6 text-blue-700" />
                      </a>
                    </div>

                    {/* Título Principal */}
                    <h3 className="font-bold text-gray-800 text-base mb-1 pr-12 leading-tight">
                      {f.nombre}
                    </h3>

                    {/* Estatus y Horario */}
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="text-emerald-700 font-semibold">Abierto</span>
                      <span className="mx-1">·</span>
                      <span>{f.horario || 'Consulta horario'}</span>
                    </div>

                    {/* Dirección y Distancia */}
                    <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100 flex flex-col gap-1">
                      {f.direccion && <span className="truncate">{f.direccion}</span>}
                      <span className="flex items-center gap-1 text-gray-400">
                        <MapPin className="w-3 h-3" /> A {f.distanciaMetros} metros de ti
                      </span>
                    </div>

                  </div>
                </div>
              </Popup>

            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
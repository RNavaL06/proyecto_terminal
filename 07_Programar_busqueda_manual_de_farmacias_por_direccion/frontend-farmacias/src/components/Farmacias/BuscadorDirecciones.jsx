import { useState, useEffect, useRef } from 'react';
// 1. Importas la función de tu archivo api.js
import { buscarDirecciones } from '../../services/api'; 
import { Search, Loader2, MapPin } from 'lucide-react'; // Iconos para el diseño clínico

const BuscadorDirecciones = ({ onSeleccion }) => {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const ignorarBusqueda = useRef(false);

  // 2. PATRÓN DEBOUNCE (Sustituye al <form> manual)
  useEffect(() => {
    if (ignorarBusqueda.current) {
      ignorarBusqueda.current = false; // Apagamos la bandera
      return; // Abortamos la búsqueda
    }
    // Si el texto está vacío o tiene menos de 3 letras, limpiamos y no buscamos
    if (!query.trim() || query.length < 3) {
      setResultados([]);
      return;
    }

    // Retraso Estratégico: Temporizador de 500ms
    const timeoutId = setTimeout(async () => {
      setCargando(true);
      setError(null);

      try {
        // Ejecución Limpia hacia tu API centralizada
        const data = await buscarDirecciones(query);
        setResultados(data);
      } catch (err) {
        console.error(err);
        setError('Hubo un error al buscar la dirección');
        setResultados([]);
      } finally {
        setCargando(false);
      }
    }, 500);

    // Reinicio Dinámico: Si el usuario escribe antes de 500ms, cancelamos el timer anterior
    return () => clearTimeout(timeoutId);
  }, [query]); // Se dispara cada vez que 'query' cambia

  // 3. Manejo de Selección
  const handleSelect = (sugerencia) => {
    ignorarBusqueda.current = true;
    setQuery(sugerencia.direccionFormateada);
    setResultados([]); // Limpia la lista desplegable
    
    // Ejecuta la función del componente padre (MapaFarmaciasPage)
    if (onSeleccion) {
      onSeleccion(sugerencia.lat, sugerencia.lng, sugerencia.direccionFormateada);
    }
  };

  return (
    // Contenedor principal relativo con z-index alto para que el dropdown flote sobre el mapa
    <div className="relative w-full max-w-lg mx-auto mb-4 z-[1000]">
      
      {/* Input Clínico Moderno */}
      <div className="relative flex items-center">
        <div className="absolute left-4 text-emerald-500">
          {cargando ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar colonia, calle o ciudad..."
          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all text-gray-700 font-medium"
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2 px-4">{error}</p>}

      {/* Contenedor Flotante de Sugerencias (Position Absolute) */}
      {resultados.length > 0 && (
        <ul className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden divide-y divide-gray-50 z-[10000]">
          {resultados.map((dir) => (
            <li
              key={dir.id}
              onClick={() => handleSelect(dir)}
              className="px-5 py-3 hover:bg-emerald-50 cursor-pointer flex items-start gap-3 transition-colors"
            >
              <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 font-medium leading-tight">
                {dir.direccionFormateada} 
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuscadorDirecciones;
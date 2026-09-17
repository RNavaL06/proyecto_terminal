import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import SearchBar from '../components/Precios/SearchBar';
import PriceTable from '../components/Precios/PriceTable';

export default function ComparativaPreciosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setHasSearched(false);
    setErrorMensaje(null);
    
    try {
      const apiKey = import.meta.env.VITE_SERPAPI_KEY;
      if (!apiKey || apiKey === 'YOUR_SERPAPI_KEY_HERE') {
        setErrorMensaje("Falta configurar la conexión con el buscador de precios.");
        setIsSearching(false);
        return;
      }
      
      // Límite de tiempo: 15 segundos máximo de espera
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`/api/serpapi/search.json?engine=google_shopping&q=${encodeURIComponent(searchTerm)}&hl=es&gl=mx&api_key=${apiKey}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error("ErrorDeConexion");
      }

      if (!response.ok || data.error) {
        setErrorMensaje("No pudimos encontrar los precios de este medicamento en las farmacias cercanas. Por favor, verifica que el nombre esté bien escrito o intenta con otra presentación.");
        setResults([]);
        setIsSearching(false);
        setHasSearched(true);
        return;
      }
      
      if (data.shopping_results) {
        // Asignamos IDs únicos temporales usando el índice y ordenamos por precio
        const formattedResults = data.shopping_results.map((item, idx) => ({
          ...item,
          id: idx,
        })).sort((a, b) => (a.extracted_price || 0) - (b.extracted_price || 0));
        
        setResults(formattedResults);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error buscando precios:", error);
      if (error.name === 'AbortError') {
        setErrorMensaje("Las farmacias están tardando demasiado en responder. Por favor, intenta buscar tu medicamento nuevamente en unos minutos.");
      } else {
        setErrorMensaje("Tuvimos un pequeño contratiempo al consultar los precios. Por favor, intenta de nuevo más tarde.");
      }
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      {/* Search Component */}
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        isSearching={isSearching}
      />

      {/* Error Message */}
      {errorMensaje && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-center gap-3 shadow-sm mx-4 sm:mx-0">
          <AlertTriangle className="w-6 h-6 flex-shrink-0 text-red-500" />
          <p className="text-sm font-medium whitespace-pre-wrap">{errorMensaje}</p>
        </div>
      )}

      {/* Table Component */}
      {hasSearched && (
        <PriceTable 
          results={results} 
          searchTerm={searchTerm} 
        />
      )}
    </div>
  );
}

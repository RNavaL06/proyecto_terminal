import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import PriceTable from './components/PriceTable';

// Resultados son traídos dinámicamente desde SerpApi

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setHasSearched(false);
    
    try {
      const apiKey = import.meta.env.VITE_SERPAPI_KEY;
      if (!apiKey || apiKey === 'YOUR_SERPAPI_KEY_HERE') {
        alert("Por favor, configura tu VITE_SERPAPI_KEY en el archivo .env");
        setIsSearching(false);
        return;
      }
      
      const response = await fetch(`/api/serpapi/search.json?engine=google_shopping&q=${encodeURIComponent(searchTerm)}&hl=es&gl=mx&api_key=${apiKey}`);
      const data = await response.json();
      
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
      console.error("Error fetching data from SerpApi:", error);
      alert("Hubo un error al buscar los precios. Revisa la consola para más detalles.");
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-2">
        {/* Header / Brand */}
        <div className="py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/30 text-white font-bold text-xl">
              +
            </div>
            <span className="text-xl font-extrabold text-slate-800 tracking-tight">
              BDI Medical
            </span>
          </div>
        </div>

        {/* Search Component */}
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          isSearching={isSearching}
        />

        {/* Table Component */}
        {hasSearched && (
          <PriceTable 
            results={results} 
            searchTerm={searchTerm} 
          />
        )}
      </div>
    </div>
  );
}

export default App;

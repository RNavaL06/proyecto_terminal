import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import PriceTable from './components/PriceTable';

const DUMMY_RESULTS = [
  {
    id: 1,
    farmacia: 'Farmacias Similares',
    precio: 45.50,
    stock: true,
    url: 'https://farmaciasdesimilares.com',
    logo: 'https://via.placeholder.com/40?text=FS',
    distancia: '1.2 km',
    actualizado: 'Hace 5 min'
  },
  {
    id: 2,
    farmacia: 'Farmacias del Ahorro',
    precio: 52.00,
    stock: true,
    url: 'https://fahorro.com',
    logo: 'https://via.placeholder.com/40?text=FA',
    distancia: '2.5 km',
    actualizado: 'Hace 10 min'
  },
  {
    id: 3,
    farmacia: 'Farmacias Guadalajara',
    precio: 49.90,
    stock: false,
    url: 'https://farmaciasguadalajara.com',
    logo: 'https://via.placeholder.com/40?text=FG',
    distancia: '3.0 km',
    actualizado: 'Hace 1 hora'
  },
  {
    id: 4,
    farmacia: 'San Pablo Farmacia',
    precio: 55.00,
    stock: true,
    url: 'https://farmaciasanpablo.com.mx',
    logo: 'https://via.placeholder.com/40?text=SP',
    distancia: '5.1 km',
    actualizado: 'Hace 2 min'
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    // Simulate API call to SerpApi
    setTimeout(() => {
      setResults(DUMMY_RESULTS.sort((a, b) => a.precio - b.precio));
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
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

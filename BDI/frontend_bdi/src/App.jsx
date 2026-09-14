import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navigation from './components/UI/Navigation';
import HomePage from './components/UI/HomePage';

// Pages
import EscanerPage from './pages/EscanerPage';
import MapaFarmaciasPage from './pages/MapaFarmaciasPage';
import CapturaVozPage from './pages/CapturaVozPage';
import ComparativaPreciosPage from './pages/ComparativaPreciosPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/escaner" element={<EscanerPage />} />
            <Route path="/farmacias" element={<MapaFarmaciasPage />} />
            <Route path="/voz" element={<CapturaVozPage />} />
            <Route path="/precios" element={<ComparativaPreciosPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

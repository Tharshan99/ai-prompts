import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Gallery from './pages/Gallery';
import Detail from './pages/Detail';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Gallery />} />
        <Route path="/prompt/:id" element={<Detail />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="app-container">
      {/* Decorative tech background grid */}
      <div className="tech-bg" />
      
      {/* Header Navigation */}
      <Navbar />

      {/* Main Pages Content */}
      <AnimatedRoutes />

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} AI Prompts. Crafted for visual creators and prompt engineering experts.</p>
          <p style={{ marginTop: '0.4rem', fontSize: '0.75rem' }}>
            Built using React, Vite, Framer Motion, and Vanilla CSS. Optimized for Vercel SPA deployment.
          </p>
        </div>
      </footer>
    </div>
  );
}

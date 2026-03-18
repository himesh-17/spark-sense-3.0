import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Analytics from './pages/Analytics/Analytics';
import About from './pages/About/About';
import Devices from './pages/Devices/Devices';
import './styles/global.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);

export default App;

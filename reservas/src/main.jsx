import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Home from "./component/Home";
import { AgregarReserva } from "./component/AgregarReserva";
import { BuscarReserva } from "./component/BuscarReserva";
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/agregar-reserva" element={<AgregarReserva />} />
        <Route path="/buscar-reserva" element={<BuscarReserva />} />
      </Routes>
    </AuthProvider>
  </Router>
);

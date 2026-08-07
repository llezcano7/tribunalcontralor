import React from 'react';
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Inicio from '../src/pages/inicio';
import Organizacion from '../src/pages/organizacion';
import Legislacion from '../src/pages/legislacion';
import InformacionPublica from '../src/pages/informacionpublica';
import DeclaracionesJuradas from '../src/pages/declaracionesjuradas';
import Institucional from '../src/pages/institucional';
import Contacto from '../src/pages/contacto';
import './reset.css';
import './library.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/organizacion' element={<Organizacion />} />
          <Route path='/legislacion' element={<Legislacion />} />
          <Route path='/informacionpublica' element={<InformacionPublica />} />
          <Route path='/declaracionesjuradas' element={<DeclaracionesJuradas />} />
          <Route path='/institucional' element={<Institucional />} />
          <Route path='/contacto' element={<Contacto />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App

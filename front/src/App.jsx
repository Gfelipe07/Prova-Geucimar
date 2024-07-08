import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Pacientes from './paginas/Pacientes';
import Medicamentos from './paginas/Medicamentos';

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Layout><Pacientes/></Layout>} />
          <Route path='/medicamentos' element={<Layout><Medicamentos/></Layout>} />
      </Routes>     
    </>
  );
}
export default App;

//comando npm install
//modificar Medicamentos.jsx e Pacientes.jsx
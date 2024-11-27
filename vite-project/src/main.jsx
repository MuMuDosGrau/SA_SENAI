import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Funcionarios from './Funcionarios';
import Epis from './Epi';
import CadastroRetirada from './CadastroRetirada';
import Historico from './Historico';
import { RetiradaProvider } from './context/RetiradaContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RetiradaProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/epis" element={<Epis />} />
        <Route path="/retiradas" element={<CadastroRetirada />} />
        <Route path="/historico" element={<Historico />} />
      </Routes>
    </Router>
  </RetiradaProvider>
  </React.StrictMode>
);

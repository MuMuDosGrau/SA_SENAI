import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1>Saúde e Segurança do Trabalho</h1>
      <div className="button-group">

        <button className="home-button" onClick={() => navigate('/epis')}>
          EPIs
        </button>

        <button className="home-button" onClick={() => navigate('/funcionarios')}>
          Funcionários
        </button>

        <button className="home-button" onClick={() => navigate('/retiradas')}>
          Registro
        </button>

        <button className="home-button" onClick={() => navigate('/historico')}>
          Historico
        </button>

      </div>
    </div>
  );
};

export default Home;

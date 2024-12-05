import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Historico.css';

const Historico = () => {
  const [historico, setHistorico] = useState([]);
  const [filteredHistorico, setFilteredHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(''); // Único estado de busca

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await axios.get('http://localhost:3000/historico');
        setHistorico(response.data);
        setFilteredHistorico(response.data); // Inicializa com todos os registros
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar o histórico.');
        setLoading(false);
      }
    };

    fetchHistorico();
  }, []);

  useEffect(() => {
    // Filtro baseado no valor de busca
    const filtered = historico.filter((registro) => {
      const funcionarioMatch = registro.Funcionario?.nome
        .toLowerCase()
        .includes(search.toLowerCase());
      const epiMatch = registro.EPI?.descricao
        .toLowerCase()
        .includes(search.toLowerCase());

      return funcionarioMatch || epiMatch; // Combina busca para funcionário ou EPI
    });

    setFilteredHistorico(filtered);
  }, [search, historico]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="historico-container">
      <h1>Histórico de Retiradas e Devoluções</h1>

      <div className="search-input">
        <input
          type="text"
          placeholder="Buscar Funcionário ou EPI"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredHistorico.length === 0 ? (
        <p>Não há registros que correspondem à busca.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>EPI</th>
              <th>Data</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistorico.map((registro, index) => (
              <tr key={index}>
                <td>{registro.Funcionario?.nome || 'N/A'}</td>
                <td>{registro.EPI?.descricao || 'N/A'}</td>
                <td>{new Date(registro.data+"T00:00").toLocaleDateString('pt-BR')}</td>
                <td>{registro.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Historico;
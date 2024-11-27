import React, { useState, useEffect } from 'react';
import './Epis.css';
import axios from 'axios';

const Epis = () => {
  const [epis, setEpis] = useState([]); // Lista de EPIs vinda do backend
  const [novoEpi, setNovoEpi] = useState(''); // Valor do input do novo EPI
  const [editandoEpi, setEditandoEpi] = useState(null); // ID do EPI sendo editado
  const [descricaoEditada, setDescricaoEditada] = useState(''); // Nova descrição ao editar

  // URL base para chamadas à API
  const baseURL = 'http://localhost:3000/epi';

  // Função para carregar EPIs do banco de dados ao montar o componente
  useEffect(() => {
    const carregarEpis = async () => {
      try {
        const response = await axios.get(`${baseURL}/listar`); // Requisição GET
        setEpis(response.data); // Atualiza o estado com os EPIs vindos do backend
      } catch (error) {
        console.error('Erro ao carregar EPIs:', error);
      }
    };

    carregarEpis();
  }, []);

  // Função para adicionar EPI no banco de dados
  const adicionarEpi = async () => {
    if (novoEpi.trim() !== '') {
      try {
        const response = await axios.post(baseURL, { descricao: novoEpi }); // Ajuste o endpoint
        setEpis((prevEpis) => [...prevEpis, response.data]);
        setNovoEpi('');
      } catch (error) {
        console.error('Erro ao adicionar EPI:', error);
      }
    }
  };

  // Função para remover EPI do banco de dados
  const removerEpi = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`); // Altere para usar ID
      setEpis((prevEpis) => prevEpis.filter((epi) => epi.id !== id)); // Atualiza a lista local
    } catch (error) {
      console.error('Erro ao remover EPI:', error);
    }
  };

  // Função para iniciar o modo de edição
  const iniciarEdicao = (epi) => {
    setEditandoEpi(epi.id); // Define o EPI sendo editado
    setDescricaoEditada(epi.descricao); // Preenche o input com a descrição atual
  };

  // Função para salvar as alterações
  const salvarEdicao = async (id) => {
    try {
      const response = await axios.put(`${baseURL}/${id}`, { descricao: descricaoEditada }); // Envia a nova descrição
      setEpis((prevEpis) =>
        prevEpis.map((epi) => (epi.id === id ? response.data : epi)) // Atualiza a lista local
      );
      setEditandoEpi(null); // Sai do modo de edição
      setDescricaoEditada('');
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  // Função para cancelar a edição
  const cancelarEdicao = () => {
    setEditandoEpi(null); // Sai do modo de edição
    setDescricaoEditada('');
  };

  return (
    <div className="epis-container">
      <h1>EPIs</h1>
      <div className="lista-epis">
        {epis.map((epi) => (
          <div key={epi.id} className="epi-item">
            {editandoEpi === epi.id ? (
              <div>
                <input
                  type="text"
                  value={descricaoEditada}
                  onChange={(e) => setDescricaoEditada(e.target.value)}
                />
                <button className="editar" onClick={() => salvarEdicao(epi.id)}>Salvar</button>
                <button className="remover" onClick={cancelarEdicao}>Cancelar</button>
              </div>
            ) : (
              <div>
                <span>{epi.descricao}</span>
                <button className="editar" onClick={() => iniciarEdicao(epi)}>Editar</button>
                <button className="remover" onClick={() => removerEpi(epi.id)}>Remover</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="cadastro">
        <input
          type="text"
          placeholder="Digite o nome do EPI"
          value={novoEpi}
          onChange={(e) => setNovoEpi(e.target.value)}
        />
        <button onClick={adicionarEpi}>CADASTRAR</button>
      </div>
    </div>
  );
};

export default Epis;

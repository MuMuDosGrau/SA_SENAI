import React, { useState, useEffect } from 'react';
import './Funcionarios.css';
import axios from 'axios';

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]); // Lista de funcionários vinda do backend
  const [novoFuncionario, setNovoFuncionario] = useState(''); // Valor do input do novo funcionário
  const [editandoFuncionario, setEditandoFuncionario] = useState(null); // ID do funcionário sendo editado
  const [nomeEditado, setNomeEditado] = useState(''); // Novo nome ao editar

  // URL base para chamadas à API
  const baseURL = 'http://localhost:3000/funcionario';

  // Função para carregar funcionários do banco de dados ao montar o componente
  useEffect(() => {
    const carregarFuncionarios = async () => {
      try {
        const response = await axios.get(`${baseURL}/listar`); // Requisição GET
        setFuncionarios(response.data); // Atualiza o estado com os dados do backend
      } catch (error) {
        console.error('Erro ao carregar funcionários:', error);
      }
    };

    carregarFuncionarios();
  }, []);

  // Função para adicionar funcionário ao banco de dados
  const adicionarFuncionario = async () => {
    if (novoFuncionario.trim() !== '') {
      try {
        const response = await axios.post(baseURL, { nome: novoFuncionario }); // Ajuste o endpoint
        setFuncionarios((prevFuncionarios) => [...prevFuncionarios, response.data]);
        setNovoFuncionario('');
      } catch (error) {
        console.error('Erro ao adicionar funcionário:', error);
      }
    }
  };

  // Função para remover funcionário do banco de dados
  const removerFuncionario = async (id) => {
  try {
    await axios.delete(`${baseURL}/${id}`);
    setFuncionarios((prevFuncionarios) => prevFuncionarios.filter((func) => func.id !== id));
  } catch (error) {
    console.error('Erro ao remover funcionário:', error);
  }
};

  // Função para iniciar o modo de edição
  const iniciarEdicao = (funcionario) => {
    setEditandoFuncionario(funcionario.id); // Define o funcionário sendo editado
    setNomeEditado(funcionario.nome); // Preenche o input com o nome atual
  };

  // Função para salvar as alterações
  const salvarEdicao = async (id) => {
    try {
      const response = await axios.put(`${baseURL}/${id}`, { nome: nomeEditado }); // Envia o novo nome
      setFuncionarios((prevFuncionarios) =>
        prevFuncionarios.map((func) => (func.id === id ? response.data : func)) // Atualiza a lista local
      );
      setEditandoFuncionario(null); // Sai do modo de edição
      setNomeEditado('');
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  // Função para cancelar a edição
  const cancelarEdicao = () => {
    setEditandoFuncionario(null); // Sai do modo de edição
    setNomeEditado('');
  };

  return (
    <div className="funcionarios-container">
      <h1>Funcionários</h1>
      <div className="lista-funcionarios">
        {funcionarios.map((funcionario) => (
          <div key={funcionario.id} className="funcionario-item">
            {editandoFuncionario === funcionario.id ? (
              <div>
                <input
                  type="text"
                  value={nomeEditado}
                  onChange={(e) => setNomeEditado(e.target.value)}
                />
                <button className="editar" onClick={() => salvarEdicao(funcionario.id)}>Salvar</button>
                <button className="remover" onClick={cancelarEdicao}>Cancelar</button>
              </div>
            ) : (
              <div>
                <span>{funcionario.nome}</span>
                <button className="editar" onClick={() => iniciarEdicao(funcionario)}>Editar</button>
                <button className="remover" onClick={() => removerFuncionario(funcionario.id)}>Remover</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="cadastro">
        <input
          type="text"
          placeholder="Digite o nome do funcionário"
          value={novoFuncionario}
          onChange={(e) => setNovoFuncionario(e.target.value)}
        />
        <button onClick={adicionarFuncionario}>CADASTRAR</button>
      </div>
    </div>
  );
};

export default Funcionarios;

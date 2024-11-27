import React, { useState } from 'react';
import { useRetirada } from './context/RetiradaContext';
import axios from 'axios';
import './CadastroRetirada.css';

const CadastroRetirada = () => {
  const { adicionarRetirada } = useRetirada();

  const [form, setForm] = useState({
    funcionario: '',
    epi: '',
    data: '',
    tipo: 'Retirada', // "Retirada" ou "Devolução"
  });
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.funcionario && form.epi && form.data) { // Certifique-se de que a data foi preenchida
      try {
        // Enviando dados para o back-end
        const response = await axios.post(
          `http://localhost:3000/${form.tipo === 'Retirada' ? 'registrarRetirada' : 'registrarDevolucao'}`,
          {
            funcionarioNome: form.funcionario,
            epiDescricao: form.epi,
            data: form.data, // A data escolhida no formulário
          }
        );
  
        if (response.status === 201) {
          adicionarRetirada({ ...form, id: response.data.id });
          setForm({ funcionario: '', epi: '', data: '', tipo: 'Retirada' });
          alert(`${form.tipo} registrada com sucesso!`);
        }
      } catch (error) {
        alert('Erro ao cadastrar a retirada/devolução.');
      }
    } else {
      alert('Preencha todos os campos.');
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro de Retiradas e Devoluções</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Funcionário:
          <input
            type="text"
            value={form.funcionario}
            onChange={(e) => setForm({ ...form, funcionario: e.target.value })}
            placeholder="Digite o nome do funcionário"
          />
        </label>
        <label>
          EPI:
          <input
            type="text"
            value={form.epi}
            onChange={(e) => setForm({ ...form, epi: e.target.value })}
            placeholder="Digite o nome do EPI"
          />
        </label>
        <label>
          Data:
          <input
            type="date"
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
          />
        </label>
        <label>
          Tipo:
          <select
            value={form.tipo}
            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          >
            <option value="Retirada">Retirada</option>
            <option value="Devolução">Devolução</option>
          </select>
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroRetirada;

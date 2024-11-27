import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Atualize com o URL correto
});

// Cadastrar um novo EPI
export const addEpi = async (descricao) => {
  const response = await api.post('/epis', { descricao });
  return response.data;
};

// Editar um EPI
export const editEpi = async (id, descricao) => {
  const response = await api.put(`/epis/${id}`, { descricao });
  return response.data;
};

// Remover um EPI
export const deleteEpi = async (id) => {
  await api.delete(`/epis/${id}`);
};

// Listar o histórico
export const fetchHistorico = async () => {
  const response = await api.get('/historico');
  return response.data;
};

// Registrar retirada de EPI
export const registrarRetirada = async (funcionarioId, epiId) => {
  const response = await api.post('/retirada', { funcionarioId, epiId });
  return response.data;
};

// Registrar devolução de EPI
export const registrarDevolucao = async (funcionarioId, epiId) => {
  const response = await api.post('/devolucao', { funcionarioId, epiId });
  return response.data;
};

import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
const RetiradaContext = createContext();

export const useRetirada = () => useContext(RetiradaContext);

export const RetiradaProvider = ({ children }) => {
  const [historico, setHistorico] = useState([]);

  // Função para adicionar uma retirada ou devolução
  const adicionarRetirada = (registro) => {
    setHistorico((prev) => [...prev, registro]);
  };

  return (
    <RetiradaContext.Provider value={{ historico, adicionarRetirada }}>
      {children}
    </RetiradaContext.Provider>
  );
};

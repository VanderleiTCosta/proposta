import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  
  async function signIn(email, password) {
    try {
      const response = await api.post('/sessions', { email, password });
      const { user: responseUser, token } = response.data;

      setUser(responseUser);

      // Configura o token para futuras requisições
      api.defaults.headers.Authorization = `Bearer ${token}`;

      // Armazena os dados no localStorage para manter o usuário logado
      localStorage.setItem('@App:user', JSON.stringify(responseUser));
      localStorage.setItem('@App:token', token);
    } catch (error) {
      console.error('Sign in failed', error);
      // Re-lança o erro para que o componente de login possa tratá-lo
      throw error;
    }
  }

  // Função de Logout
  function signOut() {
    setUser(null);
    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
    api.defaults.headers.Authorization = undefined;
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
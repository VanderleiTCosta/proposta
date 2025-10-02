import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { signed } = useAuth();

  // Se o usuário estiver logado (signed), renderiza o componente filho (a página).
  // Se não, redireciona para a página de login.
  return signed ? children : <Navigate to="/login" />;
}
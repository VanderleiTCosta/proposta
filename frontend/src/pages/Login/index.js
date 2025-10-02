import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './styles.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      alert('Falha no login. Verifique suas credenciais.');
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Acessar Painel</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Seu e-mail" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Sua senha" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
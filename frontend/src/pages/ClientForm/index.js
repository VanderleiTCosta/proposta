// src/pages/ClientForm/index.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function ClientForm() {
  const [name, setName] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name,
      company_name,
      email,
      phone,
      document,
    };

    try {
      await api.post('/clients', data);
      alert('Cliente cadastrado com sucesso!');
      navigate('/'); 
    } catch (error) {
      alert('Erro ao cadastrar cliente. Verifique os dados e tente novamente.');
      console.error('Failed to create client', error);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastrar Novo Cliente</h1>

        <div className="form-group">
          <label>Nome do Contato</label>
          <input 
            placeholder="Ex: João Silva" 
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Nome da Empresa</label>
          <input 
            placeholder="Ex: Silva & Filhos Ltda." 
            value={company_name}
            onChange={e => setCompanyName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email"
            placeholder="contato@empresa.com" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Telefone</label>
          <input 
            placeholder="(00) 99999-9999" 
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>CPF ou CNPJ</label>
          <input 
            placeholder="00.000.000/0001-00" 
            value={document}
            onChange={e => setDocument(e.target.value)}
          />
        </div>
        
        <div className="form-actions">
          <Link to="/" className="cancel-button">Cancelar</Link>
          <button type="submit" className="submit-button">Salvar Cliente</button>
        </div>
      </form>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function ProposalForm() {
  const { id } = useParams(); 
  const isEditing = !!id; 

  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [items, setItems] = useState([{ description: '', value: '' }]);
  const navigate = useNavigate();

  useEffect(() => {
    // Busca a lista de clientes sempre
    api.get('/clients').then(response => {
      setClients(response.data);
    });

    // Se estiver no modo de edição, busca os dados da proposta específica
    if (isEditing) {
      api.get(`/proposals/${id}`).then(response => {
        const { client_id, valid_until, items } = response.data;
        // Formata a data para o formato YYYY-MM-DD que o input type="date" espera
        const formattedDate = new Date(valid_until).toISOString().split('T')[0];
        
        setClientId(client_id);
        setValidUntil(formattedDate);
        setItems(items.map(({ description, value }) => ({ description, value })));
      });
    }
  }, [id, isEditing]); // Dependências do useEffect

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      client_id: clientId,
      valid_until: validUntil,
      items: items.filter(item => item.description && item.value)
    };

    try {
      if (isEditing) {
        // Se estiver editando, usa o método PUT
        await api.put(`/proposals/${id}`, data);
        alert('Proposta atualizada com sucesso!');
      } else {
        // Se for novo, usa o método POST
        await api.post('/proposals', data);
        alert('Proposta criada com sucesso!');
      }
      navigate('/');
    } catch (error) {
      alert('Erro ao salvar proposta. Tente novamente.');
      console.error('Failed to save proposal', error);
    }
  }

  // Funções para manipular a lista de itens
  function handleItemChange(index, event) {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  }

  function handleAddItem() {
    setItems([...items, { description: '', value: '' }]);
  }

  function handleRemoveItem(index) {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Título dinâmico */}
        <h1>{isEditing ? 'Editar Proposta' : 'Criar Nova Proposta'}</h1>

        <div className="form-group">
          <label>Cliente</label>
          <select value={clientId} onChange={e => setClientId(e.target.value)} required>
            <option value="">Selecione um cliente</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.company_name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Válida Até</label>
          <input type="date" value={validUntil} onChange={e => setValidUntil(e.target.value)} required />
        </div>
        <h2>Itens da Proposta</h2>
        {items.map((item, index) => (
          <div className="item-group" key={index}>
            <input type="text" name="description" placeholder="Descrição do item" value={item.description} onChange={event => handleItemChange(index, event)} required />
            <input type="number" name="value" placeholder="Valor (ex: 5000.00)" step="0.01" value={item.value} onChange={event => handleItemChange(index, event)} required />
            <button type="button" className="remove-item-button" onClick={() => handleRemoveItem(index)}>Remover</button>
          </div>
        ))}
        <button type="button" className="add-item-button" onClick={handleAddItem}>Adicionar Item</button>
        <div className="form-actions">
          <Link to="/" className="cancel-button">Cancelar</Link>
          <button type="submit" className="submit-button">Salvar Proposta</button>
        </div>
      </form>
    </div>
  );
}
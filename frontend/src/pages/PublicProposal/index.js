// src/pages/PublicProposal/index.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

// Importando todos os nossos componentes de seção
import Cover from './components/Cover';
import Introduction from './components/Introduction';
import ServicesOverview from './components/ServicesOverview';
import SectionTitle from './components/SectionTitle';
import StaticPricing from './components/StaticPricing';
import ItemsTable from './components/ItemsTable';
import CommercialPolicy from './components/CommercialPolicy';
import ProposalFooter from './components/ProposalFooter';


export default function PublicProposal() {
  const { hash } = useParams();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProposal() {
      try {
        const response = await api.get(`/view/proposal/${hash}`);
        setProposal(response.data);
      } catch (err) {
        setError('Proposta não encontrada ou inválida.');
      } finally {
        setLoading(false);
      }
    }
    fetchProposal();
  }, [hash]);

  if (loading) {
    return <div className="status-container"><h2>Carregando Proposta...</h2></div>;
  }

  if (error) {
    return <div className="status-container"><h2>{error}</h2></div>;
  }

  return (
    <div className="proposal-wrapper">
      <div className="proposal-container">
        {/* Página 1: Capa */}
        <Cover clientName={proposal.client.company_name} />

        {/* Página 2: Introdução */}
        <Introduction clientFirstName={proposal.client.name.split(' ')[0]} />

        {/* Página 3: Visão Geral dos Serviços */}
        <ServicesOverview />

        {/* Seções de Preços Estáticos (Páginas 4 a 10) */}
        <SectionTitle title="Nossos Produtos" />
        <StaticPricing type="BaaS" />
        <StaticPricing type="Cartoes" />
        <StaticPricing type="Cobranca" />
        <StaticPricing type="Pix" />
        
        {/* Seção de Custos Dinâmicos (Páginas 11 a 13) */}
        <SectionTitle title="Setup e Consumo" />
        <ItemsTable 
          items={proposal.items} 
          totalValue={proposal.total_value} 
        />
        
        {/* Página 14: Política Comercial */}
        <CommercialPolicy />

        {/* Páginas 15 e 16: Validade e Contato */}
        <ProposalFooter 
          validUntil={proposal.valid_until} 
          contactName="Notreve Pagamentos"
          contactPhone="(99) 9999-9999"
          contactEmail="Notreve@email.com"
        />
      </div>
    </div>
  );
}
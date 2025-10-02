import React from 'react';
import './styles.css';

const StaticPricing = ({ type }) => {
  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const content = {
    BaaS: {
      title: 'BaaS (Banking as a Service)',
      description: 'Nossa plataforma permite que sua empresa ofereça serviços financeiros como uma Conta Digital White Label para seus clientes.',
      tiers: [
        { range: 'Custo por conta ativa/mês', price: 1.50 },
        { range: 'Tarifa de abertura de conta', price: 5.00 },
      ]
    },
    Cartoes: {
      title: 'Emissão de Cartões',
      description: 'Com nossa solução de BIN Sponsor, você pode emitir cartões de crédito, débito e pré-pago com a sua própria marca.',
      tiers: [
        { range: 'Custo por cartão emitido', price: 15.00 },
        { range: 'Taxa de manutenção/mês', price: 2.00 },
      ]
    },
    Cobranca: {
      title: 'Gestão de Cobrança (Boleto)',
      description: 'Emita e gerencie boletos bancários registrados de forma simples e automatizada através de nossas APIs.',
      tiers: [
        // PREÇO ATUALIZADO
        { range: 'Custo por Transação (Boleto)', price: 2.49 },
      ]
    },
    Pix: {
      title: 'Soluções Pix',
      description: 'Ofereça uma solução completa para receber e realizar pagamentos instantâneos, com QR Codes, Pix Cobrança e mais.',
      tiers: [
        // PREÇO ATUALIZADO
        { range: 'Custo por Transação (Pix)', price: 0.30 },
      ]
    }
  };

  const selectedContent = content[type];

  if (!selectedContent) return null;

  return (
    <div className="page-break static-pricing-section">
      <h3 className="pricing-title">{selectedContent.title}</h3>
      <p className="pricing-description">{selectedContent.description}</p>
      
      <div className="tiers-container">
        {selectedContent.tiers.map((tier, index) => (
          <div key={index} className="pricing-slider">
            <div className="slider-track">
              <div className="slider-thumb"></div>
              <div className="slider-thumb" style={{left: '50%'}}></div>
            </div>
            <div className="slider-info">
              <span className="slider-range">{tier.range}</span>
              <span className="slider-price">
                {typeof tier.price === 'number' ? formatCurrency(tier.price) : tier.price} {tier.unit || ''}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {selectedContent.extraInfo && (
        <p className="pricing-extra-info">{selectedContent.extraInfo}</p>
      )}
    </div>
  );
};

export default StaticPricing;
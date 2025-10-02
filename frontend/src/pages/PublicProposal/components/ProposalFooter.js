import React from 'react';
import './styles.css';

const ProposalFooter = ({ validUntil, contactName, contactPhone, contactEmail }) => {
  return (
    <>
      <section className="validity-section">
        <h3>Validade da Proposta</h3>
        <p>Esta proposta é válida por 7 dias a partir da data de emissão, até <strong>{new Date(validUntil).toLocaleDateString('pt-BR')}</strong>.</p>
      </section>
      <footer className="proposal-footer">
        <h3>Estou à disposição para quaisquer esclarecimentos.</h3>
        <p>{contactName}</p>
        <p>{contactPhone} | {contactEmail}</p>
      </footer>
    </>
  );
};

export default ProposalFooter;
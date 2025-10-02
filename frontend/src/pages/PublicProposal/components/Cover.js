import React from 'react';
import './styles.css';
import notreveLogo from '../../../assets/logo.png';

const Cover = ({ clientName }) => {
  
  const proposalDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="cover-page">
      <img src={notreveLogo} alt="Notreve Logo" className="cover-logo" />

      {/* Separador visual */}
      <hr className="cover-divider" />

      <h1 className="main-title">Proposta Comercial</h1>
      
      <div className="cover-details">
        <div className="detail-item">
          <span className="detail-label">PARA:</span>
          <span className="detail-value">{clientName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">DATA:</span>
          <span className="detail-value">{proposalDate}</span>
        </div>
      </div>
    </div>
  );
};

export default Cover;
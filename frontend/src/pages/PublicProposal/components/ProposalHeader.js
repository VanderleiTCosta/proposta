import React from 'react';
import './styles.css';


import logo from '../../../assets/logo.png';

const ProposalHeader = () => {
  return (
    <header className="proposal-header">
      <img src={logo} alt="Logo da Empresa" />
      <div className="brand-placeholder">Sua Logo</div>
      <h1>Proposta Comeryyycial</h1>
    </header>
  );
};

export default ProposalHeader;
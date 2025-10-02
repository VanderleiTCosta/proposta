import React from 'react';
import './styles.css';
import diagramImage from '../../../assets/services.jpg';

const ServicesOverview = () => {
  return (
    <div className="page-break">
      <h2 className="section-heading">Ecossistema de Soluções</h2>
      <img src={diagramImage} alt="Diagrama de Serviços" className="services-diagram" />
    </div>
  );
};
export default ServicesOverview;
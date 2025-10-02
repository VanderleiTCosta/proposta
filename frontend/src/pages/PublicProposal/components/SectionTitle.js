import React from 'react';
import './styles.css';

const SectionTitle = ({ title }) => {
  return (
    <div className="page-break section-title-container">
      <h2 className="section-main-title">{title}</h2>
    </div>
  );
};
export default SectionTitle;
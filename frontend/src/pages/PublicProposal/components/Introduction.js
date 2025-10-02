import React from 'react';
import './styles.css';
import introImage from '../../../assets/hero.png';

const Introduction = ({ clientFirstName }) => {
  return (
    <div className="page-break">
      
      <img src={introImage} alt="Introdução" className="intro-image" />

      <h2 className="intro-greeting">Olá, {clientFirstName}</h2>
      <p className="intro-text">
        Nós da Notreve estamos preparados para potencializar o seu negócio, integrando um ecossistema financeiro completo e personalizado com a sua própria identidade visual.
      </p>
      <p className="intro-text">
        Acreditamos em soluções sob medida, por isso desenvolvemos estratégias inovadoras focadas em acelerar o seu crescimento e otimizar sua performance.
      </p>
      <p className="intro-text">
        Vemos o seu sucesso como o nosso principal indicador de desempenho. Através de uma parceria transparente, trabalhamos em conjunto para que você conquiste seus objetivos mais ambiciosos.
      </p>
    </div>
  );
};

export default Introduction;
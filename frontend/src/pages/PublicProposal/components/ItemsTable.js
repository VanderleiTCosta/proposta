import React from 'react';
import './styles.css';

const ItemsTable = ({ items, totalValue }) => {
  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  return (
    <section className="proposal-items">
      <h2>Detalhamento dos Serviços e Investimento</h2>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td>{formatCurrency(item.value)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Valor Total</td>
            <td>{formatCurrency(totalValue)}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default ItemsTable;
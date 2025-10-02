import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import "./styles.css";

export default function Dashboard() {
  
  const [proposals, setProposals] = useState([]);
  const { signOut, user } = useAuth();

  
  useEffect(() => {
    // Função assíncrona para buscar os dados na API
    async function loadProposals() {
      try {
        const response = await api.get("/proposals");
        setProposals(response.data);
      } catch (error) {
        console.error("Failed to load proposals", error);
        alert(
          "Erro ao carregar propostas. Verifique se o backend está rodando."
        );
      }
    }

    loadProposals();
  }, []); 

  // Função para formatar o valor como moeda brasileira
  function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  async function handleDeleteProposal(id) {
    // Pede confirmação antes de apagar
    const confirmDelete = window.confirm(
      "Tem certeza que deseja apagar esta proposta? Esta ação não pode ser desfeita."
    );

    if (confirmDelete) {
      try {
        await api.delete(`/proposals/${id}`);
        // Atualiza a lista de propostas na tela, removendo a que foi apagada
        setProposals(proposals.filter((proposal) => proposal.id !== id));
      } catch (error) {
        alert("Erro ao apagar a proposta. Tente novamente.");
      }
    }
  }

  return (
    <div className="dashboard-container">
      <header>
        <h1>Bem-vindo, {user?.name}</h1>
        <h1>Propostas Geradas</h1>
        <div className="header-buttons">
          <Link to="/clients/new" className="new-client-button">
            Novo Cliente
          </Link>
          <Link to="/proposals/new" className="new-proposal-button">
            Nova Proposta
          </Link>
          
          <button onClick={signOut} className="logout-button">
            Sair
          </button>
        </div>
      </header>

      <main>
        <ul>
          {proposals.map((proposal) => (
            <li key={proposal.id}>
              <div className="edit-container">
                <Link
                  to={`/proposals/edit/${proposal.id}`}
                  className="edit-button"
                >
                  Editar
                </Link>

                <button
                  onClick={() => handleDeleteProposal(proposal.id)}
                  className="delete-button"
                >
                  Apagar
                </button>
              </div>

              <strong>PROPOSTA #{proposal.id}</strong>
              <p>{proposal.client?.company_name || "Cliente não encontrado"}</p>

              <strong>VALOR TOTAL</strong>
              <p>{formatCurrency(proposal.total_value)}</p>

              <strong>STATUS</strong>
              <p className={`status ${proposal.status}`}>{proposal.status}</p>

              <strong>LINK PÚBLICO</strong>
              <a
                href={`/proposal/${proposal.unique_hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Proposta
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./routes/PrivateRoute";

import Dashboard from "./pages/Dashboard";
import PublicProposal from "./pages/PublicProposal";
import ProposalForm from "./pages/ProposalForm";
import Login from "./pages/Login";
import ClientForm from "./pages/ClientForm";

function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/proposal/:hash" element={<PublicProposal />} />

      {/* Rotas Privadas */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/clients/new"
        element={
          <PrivateRoute>
            <ClientForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/proposals/new"
        element={
          <PrivateRoute>
            <ProposalForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/proposals/edit/:id"
        element={
          <PrivateRoute>
            <ProposalForm />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;

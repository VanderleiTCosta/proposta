const { Client } = require('../../models');

class ClientController {
  // Método para CRIAR um novo cliente (POST /clients)
  async store(req, res) {
    try {
      const { name, company_name, email, phone, document } = req.body;
      const newClient = await Client.create({ name, company_name, email, phone, document });
      return res.status(201).json(newClient);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to create client', details: error.message });
    }
  }

  // Método para LISTAR TODOS os clientes (GET /clients)
  async index(req, res) {
    try {
      const clients = await Client.findAll();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to list clients', details: error.message });
    }
  }

  // Método para BUSCAR UM cliente pelo ID (GET /clients/:id)
  async show(req, res) {
    try {
      const { id } = req.params; // Pega o ID da URL
      const client = await Client.findByPk(id);

      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }

      return res.status(200).json(client);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve client', details: error.message });
    }
  }

  // Método para ATUALIZAR um cliente (PUT /clients/:id)
  async update(req, res) {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id);

      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }

      const updatedClient = await client.update(req.body);
      return res.status(200).json(updatedClient);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to update client', details: error.message });
    }
  }

  // Método para DELETAR um cliente (DELETE /clients/:id)
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id);

      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }

      await client.destroy();
      return res.status(204).send(); // 204: Sucesso, sem conteúdo para retornar
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete client', details: error.message });
    }
  }
}

module.exports = new ClientController();
const crypto = require("crypto");
const { Proposal, ProposalItem, Client, User, sequelize } = require("../../models");

class ProposalController {
  // --- Método para CRIAR uma nova proposta (POST /proposals) ---
  async store(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { client_id, valid_until, items } = req.body;
      const user_id = req.userId;

      const client = await Client.findByPk(client_id);
      if (!client) {
        await transaction.rollback();
        return res.status(404).json({ error: "Client not found" });
      }

      const total_value = items.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      const unique_hash = crypto.randomBytes(8).toString("hex");

      const proposal = await Proposal.create(
        {
          client_id,
          user_id, // Salva o user_id aqui
          valid_until,
          total_value,
          unique_hash,
          status: "sent",
        },
        { transaction }
      );

      const proposalItems = items.map((item) => ({
        ...item,
        proposal_id: proposal.id,
      }));
      await ProposalItem.bulkCreate(proposalItems, { transaction });

      await transaction.commit();

      const result = await Proposal.findByPk(proposal.id, {
        include: [
          { model: ProposalItem, as: "items" },
          { model: User, as: "user", attributes: ["name"] } // Inclua o usuário
        ],
      });

      return res.status(201).json(result);
    } catch (error) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ error: "Failed to create proposal", details: error.message });
    }
  }

  // --- Método para LISTAR TODAS as propostas (GET /proposals) ---
  async index(req, res) {
    try {
      const proposals = await Proposal.findAll({
        include: [
          { model: Client, as: "client" },
          { model: ProposalItem, as: "items" },
          { model: User, as: "user", attributes: ["name"] } // Inclua o usuário
        ],
      });
      return res.status(200).json(proposals);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to list proposals", details: error.message });
    }
  }

  // --- Método PÚBLICO para visualizar uma proposta pelo HASH (GET /view/proposal/:hash) ---
  async view(req, res) {
    try {
      const { hash } = req.params;
      const proposal = await Proposal.findOne({
        where: { unique_hash: hash },
        include: [
          { model: Client, as: "client" },
          { model: ProposalItem, as: "items" },
          { model: User, as: "user", attributes: ["name", "email"] } // Inclua o usuário e email para contato
        ],
      });

      if (!proposal) {
        return res.status(404).json({ error: "Proposal not found" });
      }

      return res.status(200).json(proposal);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve proposal", details: error.message });
    }
  }

  // --- Método INTERNO para buscar uma proposta pelo ID (GET /proposals/:id) ---
  async show(req, res) {
    try {
      const { id } = req.params;
      const proposal = await Proposal.findByPk(id, {
        include: [
          { model: Client, as: "client" },
          { model: ProposalItem, as: "items" },
          { model: User, as: "user", attributes: ["name"] } // Inclua o usuário
        ],
      });

      if (!proposal) {
        return res.status(404).json({ error: "Proposal not found" });
      }

      return res.status(200).json(proposal);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve proposal", details: error.message });
    }
  }

  // --- Método para ATUALIZAR uma proposta (PUT /proposals/:id) ---
  async update(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { valid_until, items } = req.body;

      const proposal = await Proposal.findByPk(id);
      if (!proposal) {
        await transaction.rollback();
        return res.status(404).json({ error: "Proposal not found" });
      }

      // 1. Deleta os itens antigos
      await ProposalItem.destroy({ where: { proposal_id: id }, transaction });

      // 2. Cria os novos itens
      const proposalItems = items.map((item) => ({ ...item, proposal_id: id }));
      await ProposalItem.bulkCreate(proposalItems, { transaction });

      // 3. Recalcula o valor total e atualiza a proposta principal
      const total_value = items.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      await proposal.update({ valid_until, total_value }, { transaction });

      await transaction.commit();

      const result = await Proposal.findByPk(id, {
        include: [
            { model: Client, as: "client" },
            { model: ProposalItem, as: "items" }
        ],
      });

      return res.status(200).json(result);
    } catch (error) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ error: "Failed to update proposal", details: error.message });
    }
  }

  // --- Método para DELETAR uma proposta (DELETE /proposals/:id) ---
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const proposal = await Proposal.findByPk(id);

      if (!proposal) {
        return res.status(404).json({ error: "Proposal not found" });
      }

      await proposal.destroy(); 
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to delete proposal", details: error.message });
    }
  }
}

module.exports = new ProposalController();
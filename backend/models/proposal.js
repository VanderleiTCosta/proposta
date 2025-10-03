"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Proposal extends Model {
    
    static associate(models) {
      this.belongsTo(models.Client, { foreignKey: "client_id", as: "client" });
      this.hasMany(models.ProposalItem, {
        foreignKey: "proposal_id",
        as: "items",
      });
      this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }
  Proposal.init(
    {
      unique_hash: DataTypes.STRING,
      status: DataTypes.STRING,
      total_value: DataTypes.DECIMAL,
      valid_until: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Proposal",
    }
  );
  return Proposal;
};
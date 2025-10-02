"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProposalItem extends Model {
   
    static associate(models) {
      
      this.belongsTo(models.Proposal, {
        foreignKey: "proposal_id",
        as: "proposal",
      });
    }
  }
  ProposalItem.init(
    {
      description: DataTypes.TEXT,
      value: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "ProposalItem",
    }
  );
  return ProposalItem;
};

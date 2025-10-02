"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    
    static associate(models) {
      this.hasMany(models.Proposal, {
        foreignKey: "client_id",
        as: "proposals",
      });
    }
  }
  Client.init(
    {
      name: DataTypes.STRING,
      company_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      document: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Client",
    }
  );
  return Client;
};

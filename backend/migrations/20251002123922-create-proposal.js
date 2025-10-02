'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Proposals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Clients', key: 'id' },
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL',
        allowNull: true,
      },
      unique_hash: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      total_value: {
        type: Sequelize.DECIMAL
      },
      valid_until: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Proposals');
  }
};
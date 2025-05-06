'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matriculas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      estudante_id: {
        allowNull: false,
        type: Sequelize.INTEGER, 
        references: {
          model: 'pessoas', // Nome da tabela referenciada
          key: 'id' // Chave primária da tabela referenciada
        },
      },
      cursos_id: {
        allowNull: false,
        type: Sequelize.INTEGER, 
        references: {
          model: 'cursos', // Nome da tabela referenciada
          key: 'id' // Chave primária da tabela referenciada
        },
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
    await queryInterface.dropTable('matriculas');
  }
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      data_inicio: {
        type: Sequelize.DATEONLY
      },
      docente_id: {
        allowNull: false,
        type: Sequelize.INTEGER, // Ele é do tipei integer porque ele é um id
        references: {
          // apesar do campo ser "model", não passamos o nome do model, e sim da tabela
          model: 'pessoas', // Nome da tabela referenciada
          key: 'id' // Chave primária da tabela referenciada
        },
      },
      categoria_id: {
        allowNull: false,
        type: Sequelize.INTEGER, 
        references: {
          model: 'categorias', // Nome da tabela referenciada
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
    await queryInterface.dropTable('cursos');
  }
};

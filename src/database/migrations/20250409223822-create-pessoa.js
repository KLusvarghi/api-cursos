'use strict';

// Esse é um arquivo de migração, e migração em ORM é basicamente alteraçẽos incrementais e raastreáveis no banco
  //  Um dos usos da migration é a "cordenação", poder cordenar alterações feitas nas tabelas do banco
  // sendo possivel rasterar as alterações feitas no banco de dados, para que seja possivel voltar para uma versão anterior

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // por padrão o coloca letra minuscula e no plural, então temos que colocar o nome da tabela no com letra minuscula para que seja mais facil dele saber aonde chama o nome dos "modelos" e as "tabelas" que estão relacionadas a esses modelos
    // await queryInterface.createTable('Pessoas', {
    await queryInterface.createTable('pessoas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      ativo: {
        type: Sequelize.BOOLEAN
      },
      role: {
        type: Sequelize.STRING
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
    // Ele apenas chama o metodo **dropTable**, basicamente para excluir uma tabela
    await queryInterface.dropTable('pessoas');
  }
};

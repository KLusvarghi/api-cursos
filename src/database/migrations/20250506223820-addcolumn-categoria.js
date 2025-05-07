'use strict';

// Esse é um arquivo de migração, e migração em ORM é basicamente alteraçẽos incrementais e raastreáveis no banco
//  Um dos usos da migration é a "cordenação", poder cordenar alterações feitas nas tabelas do banco
// sendo possivel rasterar as alterações feitas no banco de dados, para que seja possivel voltar para uma versão anterior

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adicionando mais uma coluna na tabela 'pessoas', e para isso usamos o metodo **addColumn**
    await queryInterface.addColumn('categorias', 'deletedAt', {
      allowNull: true, // se essa coluna pode ser nula ou não (tendo que passar true porque por padrão ela é null)
      type: Sequelize.DATE // passando o tipo do dado
    });
  },
  async down(queryInterface, Sequelize) {
    // Ele apenas chama o metodo **removeCOlumn**, caso seja necessario remover uma coluna
    await queryInterface.removeColumn('categorias', 'deletedAt')
  }
};

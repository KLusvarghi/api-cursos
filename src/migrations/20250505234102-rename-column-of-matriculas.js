'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('matriculas', 'cursos_id', 'curso_id');
  },

  // a função down não será rodada, mas como boas práticas, ter ela já montada facilita caso haja possiveis erros
  async down(queryInterface, Sequelize) {
    return queryInterface.renameColumn('matriculas', 'curso_id', 'cursos_id');
  }

};

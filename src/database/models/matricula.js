'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matricula extends Model {
    static associate(models) {
      Matricula.belongsTo(models.Pessoa, { // uma matricula pertence a uma pessoa
        foreignKey: 'estudante_id',
      });
      Matricula.belongsTo(models.Curso, { // uma matricula pertence a um curso
        foreignKey: 'curso_id',
      });
    }
  }
  Matricula.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matricula',
    tableName: 'matriculas',
    paranoid: true, // o sequelize tem um sistema de soft delete, que é quando você não apaga o dado, mas sim marca ele como apagado, e para isso ele cria uma coluna chamada deletedAt, e para isso precisamos ativar o paranoid
  });
  return Matricula;
};

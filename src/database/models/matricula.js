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
  });
  return Matricula;
};

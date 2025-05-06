'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    static associate(models) {
      // A BelongsToassociação é a associação na qual todas as outras associações se baseiam. É a forma mais simples de associação e deve ser usada para adicionar uma chave estrangeira a um modelo
      // o tipo "belongsTo" é usado para fazer a associação entre dois modelos, onde um modelo pertence a outro modelo, que podemos dizer que é o inverso do "hasMany"
      // basicamente, quando está na ponta de "varios", que no caso varios cursos potem estar na mesma (uma) categoria, usamos o belongsTo
      Curso.belongsTo(models.Categoria, { // um curso pertence a um categoria
        foreignKey: 'categoria_id',
      });
      Curso.belongsTo(models.Pessoa, { // um curso (docente_id) pertence a uma pessoa
        foreignKey: 'docente_id',
      });
      Curso.hasMany(models.Matricula, { // Um  curso pode ter varias matriculas
        foreignKey: 'curso_id',
      });
    }
  }
  Curso.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    data_inicio: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Curso',
    tableName: 'cursos',
  });
  return Curso;
};

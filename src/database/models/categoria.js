'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {

    static associate(models) {
      Categoria.hasMany(models.Curso, { // uma categoria pertence a varios cursos
        foreignKey: 'categoria_id',
      })
    }
  }
  Categoria.init({
    titulo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categorias',
    paranoid: true, // o sequelize tem um sistema de soft delete, que é quando você não apaga o dado, mas sim marca ele como apagado, e para isso ele cria uma coluna chamada deletedAt, e para isso precisamos ativar o paranoid
  });
  return Categoria;
};

'use strict';

// MOdelo é a camada que faz a representação dos dados na API, assim mapeando os dados relacionais que estão na tabela "Pessoa" (neste caso)
  // Alem disso, a camada de modelo é responsavel por lidar com os dados, especificando como buscamos um dado, e todo o crud em geral, é resposabilidade em fazer a interface com a base de dados, além de ter as regras de negócio


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pessoa.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    // para previnir futuros problemas com a questão do plural e singular, adicionamos o seguinte:
    tableName: 'pessoas', // com letra minuscula e no plural, assim ficando mais facil dele saber aonde chama o nome dos "modelos" e as "tabelas" que estão relacionadas a esses modelos
      //  além de que, por padrão o sequelize plurariza o nome das tabelas, porém ele só sabe fazer isso para o ingles, então se você estiver usando o sequelize em outro idioma, pode ser que ele não pluralize corretamente
  });
  return Pessoa;
};

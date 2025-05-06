'use strict';

// MOdelo é a camada que faz a representação dos dados na API, assim mapeando os dados relacionais que estão na tabela "Pessoa" (neste caso)
// Alem disso, a camada de modelo é responsavel por lidar com os dados, especificando como buscamos um dado, e todo o crud em geral, é resposabilidade em fazer a interface com a base de dados, além de ter as regras de negócio


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      // passamos dois parametros, o primeiros é o modelo que estamos associando (está na outra ponta), e o segundo são propriedades extras, uma delas é a FK que é uma propriedade obrigatória
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id',
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        // o scope é uma propriedade que nos permite fazer uma busca especifica, no caso, estamos buscando apenas os matriculados, sendo o 'status' uma propriedade de dentro da tabela 'matriculas', e o 'metriculado' o valor que queremos buscar
        // scope: {status: 'metriculado'},
        // o as um chave que usamos para passar apelidos para dentro das nossas tabelas
        as: 'aulasMatriculadas'
      })
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

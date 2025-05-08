'use strict';

const isCpfValido = require('../../utils/validateCpfHelper.js');

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
        // o scope é uma propriedade que nos permite fazer uma busca especifica, no caso, estamos buscando apenas os matriculados, sendo o 'status' uma propriedade de dentro da tabela 'matriculas', e o 'matriculado' o valor que queremos buscar
        scope: {status: 'matriculado'},
        // scope: [{status: 'matriculado'}, {data_inicio: '...'}], // caso a gente queria mais parametros / restrições, basta colocar em um array
        // o as um chave que usamos para passar apelidos para dentro das nossas tabelas
        as: 'aulasMatriculadas'
      })

      // vamos criar uma nova associação entre 'pessoas' e 'matriculas'
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        // tendo que criar um novo alias/apelido, pois o sequelize não permite que duas associações tenham o mesmo nome
        as: 'allMatriculas'
      })
    }
  }

  //  criando um escopa para o modelo
  Pessoa.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false, // não pode ser nulo
      validate: {
        notEmpty: { // validação de vazio
          args: true,
          msg: "O campo nome não pode ser vazio"
        },
        len: { // validação de tamanho
          args: [3, 30],
          msg: "O campo nome deve ter entre 3 e 30 caracteres"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Formato de e-mail inválido"
        }
      }
    },
    cpf: {
      type: DataTypes.STRING,
      validate: {
        // podendo usar tanto validação com regex direto, apenas aplicando no args
        isValidedCPF: {
          args: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
          msg: "Formato de CPF inválido"
        },

        // tanto criando uma função expecifica para validar o cpf
        cpfEhValido: (cpf) => {
          if (!isCpfValido(cpf)) throw new Error("CPF inválido")
        },
      },
    },
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    // para previnir futuros problemas com a questão do plural e singular, adicionamos o seguinte:
    tableName: 'pessoas', // com letra minuscula e no plural, assim ficando mais facil dele saber aonde chama o nome dos "modelos" e as "tabelas" que estão relacionadas a esses modelos
    //  além de que, por padrão o sequelize plurariza o nome das tabelas, porém ele só sabe fazer isso para o ingles, então se você estiver usando o sequelize em outro idioma, pode ser que ele não pluralize corretamente
    paranoid: true, // o sequelize tem um sistema de soft delete, que é quando você não apaga o dado, mas sim marca ele como apagado, e para isso ele cria uma coluna chamada deletedAt, e para isso precisamos ativar o paranoid

    // scope padrão de pessoas 
    defaultScope: {
      where: { // é aplicado aonde
        ativo: true // a prorpiedade "ativos" é igual a true
      }
    },
    scopes: {
      allRegisters: { // como ele não é o scope default, temos que dar um nome a ele
        where: {} // quando a gente não quer filtrar nada, ou pegar tudo, passamos o objeto vazio
      }
    }
  });
  return Pessoa;
};

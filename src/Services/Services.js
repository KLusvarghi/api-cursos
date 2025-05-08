// Nesta linha ele está executando o arquivo index de "model" e com isso trazendo todos os models (Pessoas, metriculas, cursos, etc)

// tudo que não for res e nem res, nós fazemos dentro do serveces

const dataSource = require('../database/models');

// essa classe genérica é que terá os métodos que serão utilizados em todos os models, como por exemplo o "findAll" que busca todos os dados de uma tabela
// e o "findByPk" que busca um dado específico da tabela, entre outros métodos que podem ser utilizados em todos os models
class Services {
  constructor(modelName) {
    this.model = modelName
  }

  // https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
  // E como temos todos os models dentro de "dataBase", essa const tem acesso ao model "Pessoa" com letra maiuscula, e com o metodo "findAll" que faz a busca de todos os dados da tabela "Pessoa"
  // async getAllRegisters() {
  //   // o "dataSource" é o arquivo que tem todos os models, e o "this.model" é o model que foi passado na hora de instanciar a classe
  //   return dataSource[this.model].findAll()
  // }

  // assim podemos trazer todos os registros com base em filtros
  // o "where" é um objeto que contém as condições que serão usadas para filtrar os registros
  async getAllRegisters(where = {}) {
    // o "dataSource" é o arquivo que tem todos os models, e o "this.model" é o model que foi passado na hora de instanciar a classe
    return dataSource[this.model].findAll({ where: { ...where } })
  }

  async getRegistersByScope(scope) {
    return dataSource[this.model].scope(scope).findAll()
  }

  // procurando apenas por PK
  async getRegistersById(id) {
    return dataSource[this.model].findByPk(id)
  }

  // procura um registro com base no filtro e retorna a ele e a quantidade de registros encontrados
  async getAndCountRegisters(options) {
    return dataSource[this.model].findAndCountAll({ 
      // antes a gente passava apenas o where, mas para deixar mais generico, passamos o obj "where" e as option de "limit" e "order", e apenas passamos o "options" com o spread operator  
      // where: { ...where },
      ...options
     })
  }

  async getRegister(where) {
    return dataSource[this.model].findOne({ where: { ...where } })
  }

  async createRegister(registerData) {
    return dataSource[this.model].create(registerData)
  }

  // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries
  // dentro dessa doc ele mostra os parametros que ele recebe e o que o metodo "update" retorne: https://sequelize.org/api/v6/class/src/model.js~model#static-method-update
  async updateRegister(updateData, where) {
    // e o "update" ele recebe dois parametros, o primeiro é os dados que serão atualizados e o segundo é um objeto com as condições de atualização, neste caso, estamos verificando apenas o campo "id"
    const resgisteList = dataSource[this.model].update(updateData, { where: { ...where } })

    // ao usar o "update" do sequelize, ele retorna um array com o primeiro elemento sendo o número de registros atualizados e o segundo elemento sendo os dados atualizados
    // então, se o primeiro elemento for 0, significa que nenhum registro foi atualizado

    if (resgisteList[0] === 0) {
      return false
    }
    return true
  }

  // apenas com id
  // async removeRegister(id) {
  //   return dataSource[this.model].destroy({ where: { id: id } })
  // }

  // com qualquer props
  async removeRegister(where) {
    return dataSource[this.model].destroy({ where: { ...where } })
  }
}
module.exports = Services

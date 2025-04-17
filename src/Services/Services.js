// Nesta linha ele está executando o arquivo index de "model" e com isso trazendo todos os models (Pessoas, metriculas, cursos, etc)

// tudo que não for res e nem res, nós fazemos dentro do serveces
const dataSource = require('../models')

// essa classe genérica é que terá os métodos que serão utilizados em todos os models, como por exemplo o "findAll" que busca todos os dados de uma tabela
// e o "findByPk" que busca um dado específico da tabela, entre outros métodos que podem ser utilizados em todos os models
class Services {
  construsctor(modelName) {
    this.model = modelName
  }

  // E como temos todos os models dentro de "dataBase", essa const tem acesso ao model "Pessoa" com letra maiuscula, e com o metodo "findAll" que faz a busca de todos os dados da tabela "Pessoa"
  async getAllRegisters() {
    return dataSource[this.model].findAll()
  }
}
module.exports = Services

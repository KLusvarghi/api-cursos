// Nesta linha ele está executando o arquivo index de "model" e com isso trazendo todos os models (Pessoas, metriculas, cursos, etc)
const dataBase = require('../models')


//  O controller é responsavel por gerenciar requisições e respostas HTTP.
class PessoasController {
    static async getAll(req, res){
      try {
        // E como temos todos os models dentro de "dataBase", essa const tem acesso ao model "Pessoa" com letra maiuscula, e com o metodo "findAll" que faz a busca de todos os dados da tabela "Pessoa"
        const peopleList = await dataBase.Pessoa.findAll();
        return res.status(200).json(peopleList);
      } catch (error) {
        // tratar error
      }
    }
}

module.exports = PessoasController;

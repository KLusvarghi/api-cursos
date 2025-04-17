//  O controller é responsavel por gerenciar requisições e respostas HTTP.

const Controller = require('./Controller.js')
const PessoaServices = require('../Services/PessoaServices.js')

// como não estamos mais lidando com classes estáticas, temos que instanciar a classe que está lá em services
const pessoaServices = new PessoaServices();

// fazendo dessa maneira para que cada controller tenha acesso ao seu respectivo service
// e assim não ter que instanciar todos os services dentro de um controller
class PessoaController extends Controller {
  constructor() {
    super(pessoaServices)
  }
}

module.exports = PessoaController;

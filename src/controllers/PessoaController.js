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

  async getActiveMatriculas(req, res) {
    const { estudante_id } = req.params;
    try {
      const matriculasList = await pessoaServices.getActiveMatriculasByStudentId(Number(estudante_id));
      return res.status(200).json(matriculasList);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllMatriculas(req, res) {
    const { estudante_id } = req.params;
    try {
      const matriculasList = await pessoaServices.getAllMatriculasByStudentId(Number(estudante_id));
      return res.status(200).json(matriculasList);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllPeopleByScope(req, res) {
    try {
      const allPeopleList = await pessoaServices.getAllPeopleByScope('allRegisters');
      return res.status(200).json(allPeopleList);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async cancelStudentRegister(req, res) {
    const { estudante_id } = req.params
    try {
      await pessoaServices.cancelStudentRegisterAndMatriculas(Number(estudante_id))
      return res.status(200).json({ mensagem: `matrículas ref. estudante de id ${estudante_id} canceladas` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PessoaController;

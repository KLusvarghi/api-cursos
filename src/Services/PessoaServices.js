const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
  }

  async getActiveMatriculasByStudentId(id) {
    // o super faz com que ele pegue as funções que estão na classe Services
    const student = await super.getRegistersById(id)
    // sendo o "aulasMatriculadas" o alias que criamos lá no model de "pessoa.js"
    const matriculasList = await student.getAulasMatriculadas()
    return matriculasList
  }

  async getAllMatriculasByStudentId(id) {
    const student = await super.getRegistersById(id)
    // sendo o "allMatriculas" o alias que criamos lá no model de "pessoa.js"
    const matriculasList = await student.getAllMatriculas()
    return matriculasList
  }

  async getAllPeopleByScope(scope) {
    return await super.getRegistersByScope(scope)
  }
}

module.exports = PessoaServices;

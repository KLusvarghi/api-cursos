const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
  }

  async getMatriculasByStudentId(id) {
    const student = await super.getResgisterById(id)
    const matriculasList = await student.getAulasMatriculadas()
    return matriculasList
  }
}

module.exports = PessoaServices;

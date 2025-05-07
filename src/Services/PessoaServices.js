const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
  }

  async getMatriculasByStudentId(id) {
    const student = await super.getResgisterById(id)
    // const student = await this.getResgisterById(id)
    const matriculasList = await student.getAulasMatriculadas()
    return matriculasList
  }

  async getAllPeopleByScope(scope){
    return await super.getRegistersByScope(scope)
  }
}

module.exports = PessoaServices;

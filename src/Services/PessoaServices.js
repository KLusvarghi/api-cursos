const dataSource = require('../database/models'); // Não é necessário passar o nome do arquivo, pois precisamos de um método específico gerado com o objeto criado pelo models/index que foi discutido anteriormente.
const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');

    // Já que estamos dentro do sercices de "pessoas" e precisamos atualizar dados dentro de "matriculas", para que possamos ter acesso ao service de "matriculas", instanciamos ele aqui"
    this.matriculaServices = new Services('Matricula');
  }

  async getActiveMatriculasByStudentId(id) {
    // o "super" faz com que ele pegue as funções que estão na classe "Services"
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

  async cancelStudentRegisterAndMatriculas(estudanteId) {
    //  Para fazer uma trnasação, precisamos basicamente englobar todas as operação de banco que fazemos dentro de uma transação

    return dataSource.sequelize.transaction(async (transacao) => { // a "transaciton" é uma opção que emos que enviar para dentro do metodo de update

      // primeira fazemos a atuação na tabela de pessoass
      await super.updateRegister({ ativo: false }, { id: estudanteId }, transacao);

      // agora fazemos a atuação na tabela de matriculas
      await this.matriculaServices.updateRegister({ status: "cancelado" }, { estudante_id: estudanteId }, transacao)
    })
  }
}

module.exports = PessoaServices;

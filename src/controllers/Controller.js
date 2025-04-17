// Sende ele um controller generico para ser utilizado em todos os models, assim, simplificando a criação de controllers, alguns metodos que podem ser utilizados em todos os models,etc

class Controller {
  // Essa classe terá que receber o nome da entidade/model para que ele
  constructor(entidadeService) {
    this.entidadeService = entidadeService
  }

  async getAll(req, res) {
    try {
      // como a responsabilidade de buscar os dados é do service, o controller apenas chama o service, tendo que assim apenas referenciar ao "entidadeService" que é o model que foi passado na hora de instanciar o controller
      const registerList = await this.entidadeService.getAllRegisters();
      return res.status(200).json(registerList);
    } catch (error) {
      // tratar error
    }
  }
}

module.exports = Controller

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


  async getById(req, res) {
    const { id } = req.params;
    try {
      const register = await this.entidadeService.getResgisterById(Number(id));
      return res.status(200).json(register);
    } catch (erro) {
      // erro
    }
  }

  async createNew(req, res) {
    const dataToCreate = req.body;
    try {
      const newCreateRegister = await this.entidadeService.createRegister(dataToCreate);
      return res.status(200).json(newCreateRegister);
    } catch (erro) {
      // erro
    }
  }

  // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries
  async update(req, res) {
    const { id } = req.params; // pega o id dos parametros
    const updateData = req.body; //pegando os dados atualizado do body
    try {
      const isUpdate = await this.entidadeService.updateRegister(updateData, Number(id));
      if (!isUpdate) {
        return res.status(400).json({ mensagem: 'registro não foi atualizado' });
      }
      return res.status(200).json({ mensagem: 'Atualizado com sucesso' });
    } catch (erro) {
      // erro
    }
  }

  async remove(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.removeRegister(Number(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });


    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

}

module.exports = Controller

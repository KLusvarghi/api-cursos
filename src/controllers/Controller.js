// Sende ele um controller generico para ser utilizado em todos os models, assim, simplificando a criação de controllers, alguns metodos que podem ser utilizados em todos os models,etc

const converteIds = require('../utils/convertStringHelper.js')

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
    } catch (erro) {
      return res.status(500).json({ message: erro.message });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const register = await this.entidadeService.getRegistersById(Number(id));
      if (!register) {
        return res.status(404).json({ message: `ID ${id} não encontrado` });
      }
      return res.status(200).json(register);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    // dessa forma, pegando todos os parametros da url, independente da quantidade
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      const register = await this.entidadeService.getRegister(where);
      if (!register) {
        return res.status(404).json({ message: `ID ${id} não encontrado` });
      }
      return res.status(200).json(register);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async createNew(req, res) {
    const dataToCreate = req.body;
    try {
      const newCreateRegister = await this.entidadeService.createRegister(dataToCreate);
      return res.status(201).json(newCreateRegister);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries
  async update(req, res) {
    // dessa forma, pegando todos os parametros da url, independente da quantidade
    const { ...params } = req.params; // pega o id dos parametros
    const updateData = req.body; //pegando os dados atualizado do body
    const where = converteIds(params);
    try {
      const isUpdate = await this.entidadeService.updateRegister(updateData, where);
      if (!isUpdate) {
        return res.status(404).json({ message: `ID ${id} não encontrado ou nenhum dado foi alterado` });
      }
      return res.status(200).json({ message: `ID ${id} atualizado com sucesso` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // async remove(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const rowsDeleted = await this.entidadeService.removeRegister(Number(id));
  //     if (!rowsDeleted) {
  //       return res.status(404).json({ message: `ID ${id} não encontrado` });
  //     }
  //     return res.status(200).json({ message: `ID ${id} deletado com sucesso` });
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // }

  async remove(req, res) {
    // dessa forma, pegando todos os parametros da url, independente da quantidade
    const { ...params } = req.params; // pega o id dos parametros
    const where = converteIds(params);

    try {
      const rowsDeleted = await this.entidadeService.removeRegister(where);
      if (!rowsDeleted) {
        return res.status(404).json({ message: `ID ${id} não encontrado` });
      }
      return res.status(200).json({ message: `ID ${id} deletado com sucesso` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

}

module.exports = Controller

const { Op } = require('sequelize');

const Controller = require('./Controller.js');
const CursoServices = require('../Services/CursoServices.js');

const cursoServices = new CursoServices();

class CursoController extends Controller {
  constructor() {
    super(cursoServices);
  }

  async getCursos(req, res) {
    const {data_inicial, data_final} = req.query;
    const where = {}

    // temos que criar essas validações para ter certeza que existe os parametros, já que não são oobrigatórios

    //se existirem os param, criar uma prop {}
    data_inicial || data_final ? where.data_inicio = {} : null; // aqui ele criar uma propriedade dentro do where chamada "data.inicio" e atribui a ela um objeto caso aidnda não exista
    // se existir data inicial, adiciona a prop gte com o valor
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null; // se data.inicio já existe ele ao objeto "data_inicio" que está dentro do "where" o Op.gte que é o operador de maior ou igual do sequelize
    // se existir data final, idem
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    console.log(where)

    try {
      const cursosLIst = await cursoServices.getAllRegisters(where)
      return res.status(200).json(cursosLIst);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CursoController;

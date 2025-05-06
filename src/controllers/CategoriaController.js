const Controller = require('./Controller.js');
const CategoriaServices = require('../Services/CategoriaServices.js');

const categoriaServices = new CategoriaServices();

class CategoriaController extends Controller {
  constructor() {
    super(categoriaServices);
  }
}

module.exports = CategoriaController;

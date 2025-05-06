const Controller = require('./Controller.js');
const MatriculaServices = require('../Services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }
}

module.exports = MatriculaController;

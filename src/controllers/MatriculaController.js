const Sequelize = require('sequelize');
const Controller = require('./Controller.js');
const MatriculaServices = require('../Services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async getMatriculasByStudent(req, res) {
    // dessa forma, pegando todos os parametros da url, independente da quantidade
    const { estudante_id } = req.params;
    try {
      // chamando a função que está em services e pssando os parametros necessários que interessa para o usuário final, o id doestudante e o status da matricula
      const matriculaLIstPerStudent = await matriculaServices.getAndCountRegisters({
        where: {
          estudante_id: Number(estudante_id),
          status: 'matriculado',
        },
        limit: 2, // trazendo apenas 2 registros no maximo (limite)
        order: [['id', 'DESC']] // ordenando por id em ordem descrescente (sendo basicamente chave e valor)
      })
      if (!matriculaLIstPerStudent) {
        return res.status(404).json({ message: `ID ${id} não encontrado` });
      }
      return res.status(200).json(matriculaLIstPerStudent);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // função que pega os cursos que estão lotados, e para isso precisamos fazer um busca utilziando agrupamento, pois precisamos agrupar os cursos que estão lotados
  async getCoursesFull(req, res) {

    const lotacaoCurso = 3

    try {
      const matriculaLIstPerStudent = await matriculaServices.getAndCountRegisters({
        where: {
          status: 'matriculado',
        },

        //  que estamos escrevendo aqui, literalmente, é meio que: junte os resultados, fazendo esse agrupamento através dos valores que estão em curso_id.

        attributes: ['curso_id'], // attributos que queremos trazer, sendo a coluna que queremos trabalhar
        group: ['curso_id'], // e no group tbm passamos o nome da coluna que queremos agrupar nossos valores

        //  e como temos a variavel "lotacaoCurso" que é o valor que queremos comparar, e já que o ORM em si não consegue lidar sozinho com isso, temos que usar um pouco de SQL aqui, mas mesmo assim o seuqelize facilita essa query, então passamos ela como um parametro para o "having", e com isso ele vai trazer apenas os cursos que estão lotados
        // o "having" é usado para filtrar os resultados de uma consulta que já foi agrupada, ou seja, ele é usado em conjunto com o "group by" (que no caso é o "group) para filtrar os resultados agregados
        having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`), // e aqui passamos o valor que queremos comparar, e com isso ele vai trazer apenas os cursos que estão lotados
      })
      if (!matriculaLIstPerStudent) {
        return res.status(404).json({ message: `ID ${id} não encontrado` });
      }
      return res.status(200).json(matriculaLIstPerStudent);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MatriculaController;

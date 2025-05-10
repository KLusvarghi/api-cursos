const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');

// agora que os metodos não são mais statics, temos que estanciar o objeto
const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

// tendo que colocar as rotas por ordem de complexidade, e depois as rotas que recebe um params
  // então por isso as rotas com ":id" vem depois das rotas que não recebem params, principamlemnte se elas são bem parecidas e a unica coisa que muda é o params 

const router = Router()
// um dos motivos do cpodigo abaixo é poque agora estamos lidando com classes, e não mais com metodos estaticos
// router.get('/pessoas', pessoaController.getAll)
router.get('/pessoas', (req, res) => pessoaController.getAll(req, res))
router.get('/pessoas/all', (req, res) => pessoaController.getAllPeopleByScope(req, res))
router.get('/pessoas/:id', (req, res) => pessoaController.getById(req, res));
router.post('/pessoas', (req, res) => pessoaController.createNew(req, res));
router.put('/pessoas/:id', (req, res) => pessoaController.update(req, res));



router.put('/pessoas/:estudante_id/cancel', (req, res) => pessoaController.cancelStudentRegister(req, res)); // essa rota muda o status do usuário para false e cancela todas as matriculas vinculadas a ele



router.delete('/pessoas/:id', (req, res) => pessoaController.remove(req, res));
router.get('/pessoas/:estudante_id/matriculas', (req, res) => pessoaController.getActiveMatriculas(req, res)); // essa rota retorna apenas as matriculas ativas
router.get('/pessoas/:estudante_id/matriculas/all', (req, res) => pessoaController.getAllMatriculas(req, res)); // essa rota retorna todas as matriculas, independente do status
router.get('/pessoas/:estudante_id/matriculas/confirmadas', (req, res) => matriculaController.getMatriculasByStudent(req, res)); // essa rota retorna todas as matriculas com status de confirmadas, mas o diferencial que ela limita a quantidade
router.get('/pessoas/matriculas/full', (req, res) => matriculaController.getCoursesFull(req, res)); // essa rota retorna as matriculas que tem a quantidade de vagas acima de 3
router.get('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.getOne(req, res)); // essa rota retorna os dados da matriculas expecífica
router.post('/pessoas/:estudante_id/matriculas', (req, res) => matriculaController.createNew(req, res));
router.put('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.update(req, res)); // essa rota atualiza a matriculas expecifica
router.delete('/pessoas/:estudante_id/matriculas/:id', (req, res) => pessoaController.remove(req, res)); // essa rota retorna deleta a matriculas ezpecífica

module.exports = router

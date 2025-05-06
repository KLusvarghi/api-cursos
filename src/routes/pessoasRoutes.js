const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');

// agora que os metodos não são mais statics, temos que estanciar o objeto
const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

const router = Router()
// um dos motivos do cpodigo abaixo é poque agora estamos lidando com classes, e não mais com metodos estaticos
// router.get('/pessoas', pessoaController.getAll)
router.get('/pessoas', (req, res) => pessoaController.getAll(req, res))
router.get('/pessoas/:id', (req, res) => pessoaController.getById(req, res));
router.post('/pessoas', (req, res) => pessoaController.createNew(req, res));
router.put('/pessoas/:id', (req, res) => pessoaController.update(req, res));
router.delete('/pessoas/:id', (req, res) => pessoaController.remove(req, res));
router.get('/pessoas/:estudanteId/matriculas', (req, res) => pessoaController.getMatriculas(req, res));
router.post('/pessoas/:estudanteId/matriculas', (req, res) => matriculaController.createNew(req, res));

module.exports = router

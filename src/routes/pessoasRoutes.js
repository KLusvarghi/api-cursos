const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

// agora que os metodos não são mais statics, temos que estanciar o objeto
const pessoaController = new PessoaController();

const router = Router()
// um dos motivos do cpodigo abaixo é poque agora estamos lidando com classes, e não mais com metodos estaticos
// router.get('/pessoas', pessoaController.getAll)
router.get('/pessoas', (req, res) => pessoaController.getAll(req, res))


module.exports = router

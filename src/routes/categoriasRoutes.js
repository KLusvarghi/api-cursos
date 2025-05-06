const { Router } = require('express');
const CategoriaController = require('../controllers/CategoriaController.js');

const categoriaController = new CategoriaController();

const router = Router();

router.get('/categorias', (req, res) => cursoController.getAll(req, res));
router.get('/categorias/:id', (req, res) => cursoController.getById(req, res));
router.post('/categorias', (req, res) => cursoController.createNew(req, res));
router.put('/categorias/:id', (req, res) => cursoController.update(req, res));
router.delete('/categorias/:id', (req, res) => cursoController.remove(req, res));


module.exports = router;

const express = require('express');
const routes = require('./routes'); // não é necessário passar o "index.js" pois o node já procura por padrão

const app = express();
routes(app);

// isso abaixo não pe necessario aqui, poruqe essa responsabilidade fica na parte de rotas
// app.use(express.json());

module.exports = app;

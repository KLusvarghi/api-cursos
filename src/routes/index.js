const express = require('express')
const pessoas = require('./pessoasRoutes.js')
const cursos = require('./cursosRoutes.js')
const categorias = require('./categoriasRoutes.js')

// O App é uma estancia do express, ele é responsavel por criar o servidor e configurar as rotas, e entre outras coisas.
module.exports = app => {
  // ele recebe o middeware para lidar com JSON, e todas as rotas de Pessoa, Matricula, Curso e Categoria
  app.use(
    express.json(),
    pessoas,
    cursos,
    categorias
  )
}



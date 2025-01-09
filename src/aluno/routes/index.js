const express = require('express')

const app = express()

const route_aluno = express.Router()


route_aluno.get('/', (req, res) => {

    res.send('rota raiz')
})

route_aluno.get('/cadastro', (req, res) => {

    res.send('rota de aluno')
})

module.exports = route_aluno;
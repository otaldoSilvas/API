const express = require('express')

const app = express()

const route_professor = express.Router()


route_professor.get('/', (req, res) => {

    res.send('rota raiz')
})

route_professor.get('/professor', (req, res) => {

    res.send('rota de professor')
})

module.exports = route_professor;
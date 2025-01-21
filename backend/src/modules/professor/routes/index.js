const express = require('express')

const route_professor = express.Router();

// http://localhost:3000/
route_professor.get('/', (requisao, resposta) => {
    resposta.send('Raiz do projeto /professor')
})
  
  // http://localhost:3000/aluno
route_professor.get('/aluno', (requisao, resposta) => {
      resposta.send('Rota de professor')
})

module.exports = route_professor;
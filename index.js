const express = require('express')
const app = express()
const port = 3001

const route_aluno = require()
const route_professor = require()

// ROUTES
 app.use('/api/aluno', route_aluno)
 app.use('/api/professor', route_professor)
 
 app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
 })
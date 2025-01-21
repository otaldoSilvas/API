const express = require('express')
const route_aluno = express.Router();
const autenticar = require('../../../middleware/autenticar')
// importando o controller
const {criar, atualizarPerfil, deletarPerfil, listarPerfil, login} = require('../controllers/index')

// Listar os alunos por id
// http://localhost:3001/aluno/1
route_aluno.get('/perfil', autenticar, listarPerfil);

// Atualizar o aluno por id
// http://localhost:3001/aluno/editar/1
route_aluno.put('/perfil',autenticar, atualizarPerfil);

// Cadastrar aluno
// http://localhost:3001/aluno/cadastrar
route_aluno.post('/cadastrar', criar);

// Deletar aluno especifico
// http://localhost:3001/aluno/deletar/1
route_aluno.delete('/perfil',autenticar, deletarPerfil);

// Login do aluno
// http://localhost:3001/aluno/login
route_aluno.post('/login', login)
module.exports = route_aluno;
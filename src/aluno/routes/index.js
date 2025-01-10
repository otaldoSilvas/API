const express = require('express')
const route_aluno = express.Router();

// importando o controller
const { listar, criar, atualizar, deletar, deletarTodos, listarPorId} = require('../controllers/index')

// Listar todos os alunos
// http://localhost:3001
route_aluno.get('/', listar );

// Listar os alunos por id
// http://localhost:3001/aluno/1
route_aluno.get('/:id', listarPorId);

// Atualizar o aluno por id
// http://localhost:3001/aluno/editar/1
route_aluno.put('/editar/:id', atualizar);

// Cadastrar aluno
// http://localhost:3001/aluno/cadastrar
route_aluno.post('/cadastrar', criar);

// Deletar aluno especifico
// http://localhost:3001/aluno/deletar/1
route_aluno.delete('/deletar/:id', deletar);

// Deletar todos os alunos
// http://localhost:3001/aluno/deletar
route_aluno.delete('/deletar', deletarTodos);

module.exports = route_aluno;
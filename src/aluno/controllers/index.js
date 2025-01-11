const { where } = require("sequelize");
const Aluno = require("../models/index");

// Listar alunos - read
const listar = async (requisicao, resposta) => {
  try {
    const alunos = await Aluno.findAll();
    resposta.status(200).json(alunos);
  } catch (error) {
    resposta.status(500).json({ error: "Erro ao listar os alunos!", detalhes: error.message});
  }
};
// Cadastrar alunos - create
const criar = async (requisicao, resposta) => {
  try {
    const { nome, email, notas, senha } = requisicao.body;
    const novoAluno = await Aluno.create({ nome, email, notas, senha });
    resposta.status(201).json(novoAluno);
  } catch (error) {
    resposta.status(500).json({ error: "Erro ao cadastrar aluno!", detalhes: error.message });
  }
};

const atualizar = async (requisicao, resposta) => {
  try {
    // localhost:3000/api/aluno/1
    const { id } = requisicao.params;
    const { nome, email, notas, senha } = requisicao.body;
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return resposta.status(404).json({ msg: "Usuario não encontrado!" });
    }
    await aluno.update({ nome, email, notas, senha });
    resposta.status(200).json(aluno);
  } catch (error) {
    resposta.status(500).json({ error: "Erro ao atualizar aluno!", detalhes: error.message });
  }
};

const deletar = async (requisicao, resposta) => {
  try {
    // localhost:3000/api/aluno/1
    const { id } = requisicao.params;
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return resposta.status(404).json({ msg: "Usuario não encontrado!" });
    }
    await aluno.destroy();
    resposta.status(200).json({ msg: "Usuario deletado com sucesso" });
  } catch (error) {
    resposta.status(500).json({ error: "Erro ao excluir aluno", detalhes: error.message });
  }
};

const deletarTodos = async (requisicao, resposta) => {
  try {
    await Aluno.destroy({where: {}});
    resposta.status(200).json({ msg: "Todos os alunos foram excluidos!" });
  } catch (error) {
    resposta.status(500).json({ error: "Erro ao excluir os alunos!", detalhes: error.message });
  }
};

const listarPorId = async (requisicao, resposta) => {
  try {
    const { id } = requisicao.params;
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return resposta.status(404).json({ msg: "Usuario não encontrado!" });
    }
    resposta.status(200).json(aluno);
  } catch (error) {
    resposta.status(500).json({ error: "Erro ao deletar todos os usuarios", detalhes: error.message });
  }
};

module.exports = { listar, criar, atualizar, deletar, deletarTodos, listarPorId };

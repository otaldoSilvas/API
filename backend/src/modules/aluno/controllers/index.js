const { where } = require("sequelize");
const Aluno = require("../models/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
// Login Aluno
const login = async (requisicao, resposta) => {
  try {
    const { email,senha } = requisicao.body;
    if(!email || !senha){
      return resposta.status(400).json({msg: "É obrigatorio fornecer o email e a senha"})
    }
    const aluno  = await Aluno.findOne({where: {email}})
    if(!aluno){
      return resposta.status(401).json({msg: "Usuario não encontrado"})
    }
    const senhaValida = await bcrypt.compare(senha,aluno.senha)
    if(!senhaValida){
      return resposta.status(401).json({msg: "Senha Invalida", detalhas: erro.message});
    }
    const token = jwt.sign({id: aluno.id, email: aluno.email}, process.env.SECRET_KEY, {expiresIn:'24h'})
    resposta.status(200).json({msg: "Usuario autenticado!", token})
  } catch (error) {
    
  }
}
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

const atualizarPerfil = async (requisicao, resposta) => {
  try {
    // localhost:3000/api/aluno/1
    const id = requisicao.aluno.id;
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

const deletarPerfil = async (requisicao, resposta) => {
  try {
    // localhost:3000/api/aluno/1
    const id = requisicao.aluno.id;
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

const listarPerfil = async (requisicao, resposta) => {
  try {
    const id  = requisicao.aluno.id;
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return resposta.status(404).json({ msg: "Usuario não encontrado!" });
    }
    resposta.status(200).json(aluno);
  } catch (error) {
    resposta.status(500).json({ error: "Erro ao deletar todos os usuarios", detalhes: error.message });
  }
};

module.exports = { criar, atualizarPerfil, deletarPerfil, listarPerfil, login };

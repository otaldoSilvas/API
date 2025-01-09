const Aluno = require('../models/index')

const listar = async (requisicao, respota) => {
    try{
        const aluno = Aluno.findAll();
        respota.status(200).json(aluno)
    } catch(error){
        respota.status(500).json({error:'Erro ao listar os alunos'})
    }
}

module.exports = {listar,}
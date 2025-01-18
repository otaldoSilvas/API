const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const autenticar = (requisicao, resposta, proximo) =>{
    const token = requisicao.headers.authorization?.split(" ")[1]
    if(!token){
        return resposta.status(401).json({msg:'Acesso não autorizado', detalhes: 'Token não fornecido'})
    }
    try {
        const aluno = jwt.verify(token,process.env.SECRET_KEY);

        if(!aluno){
            return resposta.status(401).json({msg:'Token invalido', detalhes: 'Token invalido'})
        }
        requisicao.aluno = aluno;
        proximo()
    } catch (error) {
        resposta.status(401).json({error:'Erro ao autenticar', detalhes: 'Token Ausente'})
        
    }
}

module.exports =  autenticar 
const express = require('express')
const sequelize = require('./src/config/configDb')
const route_aluno = require('./src/modules/aluno/routes/index')
const route_professor = require('./src/modules/professor/routes/index')
const app = express()
const port = 3001

app.use(express.json());

// importando as rotas
app.use('/api/aluno', route_aluno)
app.use('/api/professor', route_professor)

app.listen(port, async () => {
  await sequelize.authenticate();
  console.log('Banco autenticado!');
  await sequelize.sync({ force: true });
  console.log('Banco de dados sincronizado com sucesso!');
  console.log(`Servidor rodando em http://localhost:${port}!`);
});

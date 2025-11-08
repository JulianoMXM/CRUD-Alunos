//  Configuração inicial
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()

//  Configuração de leitura de JSON

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//  Porta utilizada

mongoose
    .connect('mongodb+srv://${DB_USER}:${DB_PASSWORD}@projetounect.h56t2wl.mongodb.net/?appName=ProjetoUnect')
    .then(() => {
        console.log('Conectado')
        app.listen(3000)
    })
    .catch((err) => console.log(err))

//  Rotas da API

const alunoRoutes = require('./routes/alunoRoutes')

app.use('/alunos', alunoRoutes)

//  Rota inicial / endpoint

app.get('/', (req, res) => {

    res.json({
        message: 'Teste resposta'
    })

})
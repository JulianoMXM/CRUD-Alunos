//  Configuração inicial
require('dotenv').config()
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

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

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
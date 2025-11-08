//  Configuração inicial
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()

const Aluno = require('./models/Aluno')

//  Configuração de leitura de JSON

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//  Porta utilizada

mongoose
    .connect('mongodb+srv://User:UnectJr@projetounect.h56t2wl.mongodb.net/?appName=ProjetoUnect')
    .then(() => {
        console.log('Conectado')
        app.listen(3000)
    })
    .catch((err) => console.log(err))

//  Rotas da API
app.post('/alunos', async (req, res) =>{

    const {name, age, ra, cpf, createdAt, updatedAt} = req.body

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório.'})
    }
    if(!age){
        res.status(422).json({error: 'A idade é obrigatória'})
    }
    if(!ra){
        res.status(422).json({error: 'O RA é obrigatório.'})
    }
    if(!cpf){
        res.status(422).json({error: 'O CPF é obrigatório.'})
    }

    const aluno = {
        name,
        age,
        ra,
        cpf,
        createdAt,
        updatedAt
    }

    try{

        await Aluno.create(aluno)
        res.status(201).json({message: 'Aluno cadastrado com sucesso.'})

    }catch(error){
        res.status(500).json({error: error})
    }
    
})

//  Rota inicial / endpoint

app.get('/', (req, res) => {

    res.json({
        message: 'Teste resposta'
    })

})
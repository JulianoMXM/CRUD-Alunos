const router = require('express').Router()
const Aluno = require('../models/Aluno')

//  Rotas da API

//  Create - Criação de Dados
router.post('/', async (req, res) =>{

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

//  Read - Leitura de Dados

router.get('/', async(req, res) =>{
    try{

        const alunos = await Aluno.find()
        res.status(200).json(alunos)

    }catch{
        res.status(500).json({error: error})
    }
})

//  Read - Leitura de Dados de um aluno específico

router.get('/:id', async(req, res) =>{

    const id = req.params.id

    try{

        const aluno = await Aluno.findOne({_id: id})
        res.status(200).json(aluno)
        
    }catch{
        res.status(500).json({error: error})
    }
})
module.exports = router
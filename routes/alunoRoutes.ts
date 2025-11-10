const router = require('express').Router()
const Aluno = require('../models/Aluno')

//  Rotas da API

//  Create - Criação de Dados
router.post('/', async (req: Request, res: Response) =>{

    const {name, age, ra, cpf} = req.body

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório.'})
        return
    }
    if(!age){
        res.status(422).json({error: 'A idade é obrigatória'})
        return
    }
    if(!ra){
        res.status(422).json({error: 'O RA é obrigatório.'})
        return
    }
    if(!cpf){
        res.status(422).json({error: 'O CPF é obrigatório.'})
        return
    }

    const aluno = {
        name,
        age,
        ra,
        cpf
    }

    try{

        await Aluno.create(aluno)
        res.status(201).json({message: 'Aluno cadastrado com sucesso.'})

    }catch(error){
        res.status(500).json({error: error})
    }
    
})

//  Read - Leitura de Dados

router.get('/', async(req: Request, res: Response) =>{
    try{

        const alunos = await Aluno.find()
        res.status(200).json(alunos)

    }catch{
        res.status(500).json({error: error})
    }
})

//  Read - Leitura de Dados de um aluno específico

router.get('/:id', async(req: Request, res: Response) =>{

    const id = req.params.id

    try{

        const aluno = await Aluno.findOne({_id: id})

        if(!aluno){
            res.status(422).json({error: 'Aluno não encontrado.'})
        }
        res.status(200).json(aluno)
        
    }catch{
        res.status(500).json({error: error})
    }
})

//  Update - Atualização de Dados

router.patch('/:id', async(req: Request, res: Response) => {

    const id = req.params.id

    const { name, age, ra, cpf} = req.body

    const aluno = {

        name,
        age,
        ra,
        cpf
    }

    try{

        const updatedAluno = await Aluno.updateOne({_id: id}, aluno)

        if(updatedAluno.matchedCount === 0){

            res.status(422).json({error: 'Aluno não encontrado'})
            return

        }
        res.status(200).json(aluno)

    } catch(error){
        res.status(500).json({error: error})
    }

})

//Delete - Deleta Dados

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const aluno = await Aluno.findOne({_id: id})

    if(!aluno){

        res.status(422).json({message: 'Aluno não encontrado.'})
        return

    }
    try{

        await Aluno.deleteOne({_id: id})
        res.status(200).json({message: 'Aluno removido com sucesso.'})

    }catch(error){

        res.status(500).json({error: error})

    }
})
module.exports = router
const router = require('express').Router()

//  Rotas da API
router.post('/alunos', async (req, res) =>{

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

module.exports = router
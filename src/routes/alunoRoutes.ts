import {Router} from 'express';
import type {Response, Request} from 'express';
export const router = Router();
import {Aluno, type IAluno} from '../models/Aluno.js'
import type { FilterQuery } from 'mongoose';
import dayjs from 'dayjs'

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
    if(age <= 0){
        res.status(422).json({error: 'A idade não pode ser zero ou negativa.'})
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
        cpf,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate()
    }

    try{

        await Aluno.create(aluno)
        res.status(201).json({message: 'Aluno cadastrado com sucesso.'})

    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({error: error.message})
        }
        res.status(500).json({error: 'Erro desconhecido.'})
    }
    
})

//  Read - Leitura de Dados

router.get('/', async(req: Request, res: Response) =>{
    
    const filter: FilterQuery<IAluno> = {}
    const {name, ra} = req.query
    
    if(ra){
        filter.ra = String(ra)
    }else if(name){
        filter.name = {$regex: String(name), $options: 'i'}
    }
    
    try{
        const alunos = await Aluno.find(filter)
        res.status(200).json(alunos)

    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({error: error.message})
        }
        res.status(500).json({error: 'Erro desconhecido.'})
    }
})

//  Read - Leitura de Dados de um aluno específico

router.get('/:id', async(req: Request<{id: string}>, res: Response) =>{

    const id = req.params.id

    try{

        const aluno = await Aluno.findOne({_id: id})

        if(!aluno){
            return res.status(422).json({error: 'Aluno não encontrado.'})
        }
        res.status(200).json(aluno)
        
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({error: error.message})
        }
        res.status(500).json({error: 'Erro desconhecido.'})
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
        cpf,
        updatedAt: dayjs().toDate()
    }

    if(age <= 0){
        res.status(422).json({error: 'A idade não pode ser zero ou negativa.'})
        return
    }

    try{

        const updatedAluno = await Aluno.updateOne({_id: id}, aluno)

        if(updatedAluno.matchedCount === 0){

            res.status(422).json({error: 'Aluno não encontrado'})
            return

        }
        res.status(200).json(aluno)

    } catch(error){
        if(error instanceof Error){
            return res.status(500).json({error: error.message})
        }
        res.status(500).json({error: 'Erro desconhecido.'})
    }

})

//Delete - Deleta Dados

router.delete('/:id', async (req: Request, res: Response) => {

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
        if(error instanceof Error){
            return res.status(500).json({error: error.message})
        }
        res.status(500).json({error: 'Erro desconhecido.'})
    }
})
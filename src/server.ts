//  Configuração inicial
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
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
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@projetosunect.wtzr5ke.mongodb.net/`
)
    .then(() => {
        console.log('Conectado')
        app.listen(3000)
    })
    .catch((error: Error) => console.log(Error))

//  Rotas da API

import {router as alunoRoutes} from './routes/alunoRoutes.js'
    
app.use('/alunos', alunoRoutes)
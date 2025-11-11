import {Schema, model} from 'mongoose';

interface IAluno extends Document{

    name: String,
    age: Number,
    ra: String,
    cpf: String,
    createdAt: Date,
    updatedAt: Date,

}

const alunoSchema = new Schema<IAluno>({
    name: String,
    age: Number,
    ra: String,
    cpf: String,
    createdAt: Date,
    updatedAt: Date,
})

export const Aluno = model<IAluno>('Aluno', alunoSchema)

/*type Aluno = mongoose.model('Aluno', {

    name: String,
    age: Number,
    ra: String,
    cpf: String
    
})*/
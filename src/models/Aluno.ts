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
    name: {type: String},
    age: {type: Number},
    ra: {type: String, unique: true},
    cpf: {type: String, unique: true},
    createdAt: {type: Date},
    updatedAt: {type: Date}
})

export const Aluno = model<IAluno>('Aluno', alunoSchema)
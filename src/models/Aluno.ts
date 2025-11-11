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

const Aluno = model<IAluno>('Aluno', alunoSchema)

export default Aluno;

/*type Aluno = mongoose.model('Aluno', {

    name: String,
    age: Number,
    ra: String,
    cpf: String
    
})*/
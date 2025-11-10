const mongoose = require('mongoose')

const Aluno = mongoose.model('Aluno', {

    name: String,
    age: Number,
    ra: String,
    cpf: String,
    createdAt: Date,
    updatedAt: Date,

})

module.exports = Aluno
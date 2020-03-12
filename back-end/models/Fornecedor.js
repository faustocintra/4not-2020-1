const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   razao_social: {
      type: String,
      required: true
   },
   nome_fantasia: {
      type: String
   },
   cnpj: {
      type: String,
      required: true,
      index: { unique: true } // Não pode repetir CNPJ
   },
   inscricao_estadual: {
      type: String,
      validate: {
         validator: val => {
            // Inscrição Estadual precisa ser 'ISENTO' ou um número inteiro
            return val.toUpperCase() == 'ISENTO' || !isNaN(Number(val))
         },
         message: 'Inscrição Estadual precisa ser "ISENTO" ou um número inteiro'
      },
      required: true
   },
   endereco: {
      type: String,
      required: true
   },
   telefone: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   }
})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Fornecedor', esquema, 'fornecedores')
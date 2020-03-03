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
      required: true
   },
   inscricao_estadual: {
      type: String
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
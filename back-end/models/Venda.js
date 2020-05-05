const mongoose = require('mongoose')

// ---> É necessário instalar: yarn add mongoose-sequence
// mongoose está sendo passado como parâmetro para mongoose-sequence
const mongooseSeq = require('mongoose-sequence')(mongoose);

const esquema = mongoose.Schema({
   data_venda: {
      type: Date,
      required: true
   },
   forma_pagamento: {
      type: String,
      required: true,
      enum: ['DI', 'CH', 'CC', 'CD']
      // DI = dinheiro
      // CH = cheque
      // CC = cartão de crédito
      // CD = cartão de débito
   },
   data_pagamento: {
      type: Date
   },
   num_venda: {
      type: Number,
      index: { unique: true }
   },
   cliente: {
      type: mongoose.ObjectId,
      ref: 'Cliente', // Nome do model referenciado
      required: true
   }
})

// inc_field: o campo a ser autoincrementado
// start_seq: o número que irá iniciar a contagem. Default: 1
esquema.plugin(mongooseSeq, {inc_field: 'num_venda', start_seq: 1});

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Venda', esquema, 'vendas')
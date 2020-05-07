const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   quantidade: {
      type: Number,
      required: true,
      validate: {
         validator: function(val) {
            return val > 0
         },
         message: 'A quantidade deve ser maior do que zero'
      }
   },
   desconto: {
      type: Number,
      required: true,
      default: 0  // Se nenhum valor for especificado, assume 0
   },
   acrescimo: {
      type: Number,
      required: true,
      default: 0
   },
   venda: {
      type: mongoose.ObjectId,
      ref: 'Venda',
      required: true
   },
   produto: {
      type: mongoose.ObjectId,
      ref: 'Produto',
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
module.exports = mongoose.model('ItemVenda', esquema, 'itens_venda')
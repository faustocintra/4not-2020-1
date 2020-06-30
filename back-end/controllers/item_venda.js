const ItemVenda = require('../models/ItemVenda')

const controller = {} // Objeto vazio

controller.novo = async (req, res) => {
   try {
      await ItemVenda.create(req.body)
      // HTTP Status 201: Created
      res.status(201).end()
   }
   catch (erro) {
      console.log(erro)
      // HTTP 500: Internal Server Error
      res.status(500).send(erro)
   }
}

controller.listar = async (req, res) => {
   
   if(Object.keys(req.query).length > 0) { // Se houver query string
      busca(req, res)
   }
   else { // sem query string
      try {
         // find(), sem parâmetros, retorna todos
         //const lista = await ItemVenda.find().populate('venda').populate('produto')

         // populate() dentro de populate() / populate() de segundo nível
         const lista = await ItemVenda.find().populate(
            // path: nome do campo populado (1º nível)
            // populate: nome do campo populado (2º nível)
            { path:'venda', populate: 'cliente' }
         )
         .populate(
            // path: nome do campo a ser populado
            // select: lista de campos a serem exibidos separados por espaço
            { path: 'produto', /* select: 'descricao data_validade fornecedor', */populate: 'fornecedor' }
         )

         res.send(lista) // HTTP 200 implícito
      }
      catch (erro) {
         console.log(erro)
         res.status(500).send(erro)
      }
   }

}

controller.obterUm = async (req, res) => {

   try {
      const id = req.params.id
      const obj = await ItemVenda.findById(id)
      if (obj) { // obj foi encontrado
         res.send(obj) // HTTP 200 implícito
      }
      else {
         // HTTP 404: Not found
         res.status(404).end()
      }
   }
   catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

controller.atualizar = async (req, res) => {
   try {
      const id = req.body._id
      const obj = await ItemVenda.findByIdAndUpdate(id, req.body)
      if (obj) { // obj encontrado e atualizado
         // HTTP 204: No content
         res.status(204).end()
      }
      else {
         res.status(404).end()
      }
   }
   catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

controller.excluir = async (req, res) => {
   try {
      const id = req.body._id
      const obj = await ItemVenda.findByIdAndDelete(id)
      if (obj) {
         res.status(204).end()
      }
      else {
         res.status(404).end()
      }
   }
   catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

async function busca(req, res) {
   let criterio = {}
  
   const atrib = Object.keys(req.query)[0]
   const valor = Object.values(req.query)[0]
   
   // $options: 'i' => case insensitive
   criterio[atrib] = { $regex: valor, $options: 'i'}

   console.log('Critério:')
   console.log(criterio)

   try {
      const lista = await ItemVenda.find(criterio)
      res.send(lista)
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

controller.filtrarVenda = async (req, res) => {
   let id = req.params.id

   try {
      // Só os itens de venda de uma determinada venda
      const lista = await ItemVenda.find({venda: id})
         .populate('produto')
         .populate('venda')
      res.send(lista)
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }

}

module.exports = controller
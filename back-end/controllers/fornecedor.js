const Fornecedor = require('../models/Fornecedor')

const controller = {} // Objeto vazio

controller.novo = async (req, res) => {
   try {
      await Fornecedor.create(req.body)
      // HTTP Status 201: Created
      res.sendStatus(201)
   }
   catch(erro) {
      console.log(erro)
      // HTTP 500: Internal Server Error
      res.status(500).send(erro)
   }
}

module.exports = controller
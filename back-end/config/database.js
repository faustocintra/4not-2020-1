const mongoose = require('mongoose')

module.exports = function(uri) {
   mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
   })

   mongoose.connection.on('connected', () =>
      console.log(`Mongoose! conectado a ${uri}`)
   )

   mongoose.connection.on('disconnected', () =>
      console.log(`Mongoose! desconectado de ${uri}`)
   )

   mongoose.connection.on('error', erro =>
      console.log(`Mongoose! ERRO ao conectar a ${uri}: ${erro}`)
   )

   process.on('SIGINT', () => 
      mongoose.connection.close(() => {
         console.log('Mongoose! desconectado pelo término da aplicação')
         process.exit(0) // 0 => saída sem erros
      })
   )

}
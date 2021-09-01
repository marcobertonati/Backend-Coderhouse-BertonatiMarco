const http = require('../../server.es6')
const io = require('socket.io')(http)

/* Requiero DB y configuración de la misma */
const { options } = require('../../options/mysqlDB');
const knex = require('knex')(options);


const ioEvents = io.on('connection', async (socket) => {

    console.log(`Usuario conectado ${socket.id}`);
  
    /*Evento envia chat */
    const historyChats = await knex.from('history-chat').select('*')
      .then((rows) => rows)
      .catch(e=>console.log(e))
      // .finally(()=>knex.destroy())
    socket.emit('list-msg-chat', historyChats);
  
    /*Evento escucha de mensaje */
    socket.on('msg-chat', async (data) => {
      /*Si no se agrega async - await duplica los mensajes */
  
      const dbMsgChat = [ { user: data.user, msg: data.msg, date: data.date}]
  
      /*Se guarda en la DB */
      await knex('history-chat').insert(dbMsgChat)
        .then(()=> console.log('Chat insertado'))
        .catch((err)=> {
          console.log('Se produjo un error')
          console.log(err)})
        // .finally(()=> knex.destroy());
        /*Con el Finally se corta la conexión knex. Por lo cual una vez que graba en base de datos se corta. Si lo pongo solo se guarda un mensaje y luego aparece un error. */
  
      const historyChats = await knex.from('history-chat').select('*')
        .then((rows) => rows)
        .catch(e=>console.log(e))
        // .finally(()=>knex.destroy())
      io.emit('list-msg-chat', historyChats);
    })
  
    /*Evento desconectar */
    socket.on('disconnect', () => {
      console.log(`El usuario ${socket.id} se desconectó`);
    });
  
  })


//   module.exports = { ioEvents }
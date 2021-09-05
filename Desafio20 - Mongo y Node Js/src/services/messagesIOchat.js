/*Requiero Mongoose para chats */
const messagesChat = require('../dao/models/messagesMongoose');
/*Deberia tratar de requerirlo desde servicios */

module.exports = (io) => {
    io.on("connection", async (socket) => {
        console.log(`Usuario conectado ${socket.id}`);
      
        /*Traigo todos los mensajes */
        try {
          const historyChats = await messagesChat.find();
          socket.emit('list-msg-chat', historyChats);
            } catch (error) {
                console.log(error)
            }
      
        socket.on('msg-chat', async (data)=> {
      
          try {
            const dbMsgChat = [{ user: data.user, msg: data.msg, date: data.date}];
            await messagesChat.create(dbMsgChat);
          } catch (error) {
            console.log(error)
          }
      
          try {
            const historyChats = await messagesChat.find();
            io.emit('list-msg-chat', historyChats); 
          } catch (error) {
            console.log(error)  
          }
          })
      
        /*Evento desconectar */
        socket.on("disconnect", () => {
          console.log(`El usuario ${socket.id} se desconectó`);
        });
      });

    return io
}
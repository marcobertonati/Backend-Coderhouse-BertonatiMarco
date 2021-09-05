const MessagesChatService = require('../services/messagesChat');
const messageChat = new MessagesChatService();

exports.createMsg = async (req,res,next) => {
    console.log('Entro a createMsg');
    const msgCreated = await messageChat.createMessage(req.body);
    res.json({msg: 'Message Chat created!', messageChat: msgCreated})
}

exports.getAllMsgChat = async (req,res,next) => {
    console.log('Entro a getAllmsgChat');
    const allMesgChat = await messageChat.getAllMessage();

    //Sirve para la petición HTTP
    res.json({msg: 'Messages from chat', historialMessages: allMesgChat});

    // Sirve para SocketIo
    // res.render("websocket",allMesgChat);
}
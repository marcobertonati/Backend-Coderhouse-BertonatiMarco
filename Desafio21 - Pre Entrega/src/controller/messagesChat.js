const MessagesChatService = require("../services/messagesChat");
const messageChat = new MessagesChatService();

exports.createMsg = async (req, res, next) => {
  console.log("Controller => messagesChat => createMsg");

  try {
    const msgCreated = await messageChat.createMessage(req.body);
    res.json({ msg: "Message Chat created!", messageChat: msgCreated });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getAllMsgChat = async (req, res, next) => {
  console.log("Controller => messagesChat => getAllMsgChat");

  try {
    const allMesgChat = await messageChat.getAllMessage();

    //Sirve para la petición HTTP
    res.json({ msg: "Messages from chat", historialMessages: allMesgChat });

    // Sirve para SocketIo
    // res.render("websocket",allMesgChat);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

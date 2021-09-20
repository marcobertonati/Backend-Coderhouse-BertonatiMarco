const MessagesChatService = require("../services/messagesChat");
const messageChat = new MessagesChatService();

const { normalize, schema } = require('normalizr');

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

    /*NORMALIZAR */    
    const schemaAuthor = new schema.Entity('author', {
      // id: id,
      // firstName: firstName,
      // lastName: lastName,
    }, {idAttribute: (value) => value.author.id});

    const schemaMsg = new schema.Entity('text')

    // const schemaAuthorList = new schema.Array(schemaAuthor)
    const schemaAuthorList = new schema.Array(schemaAuthor)


    const normalizedChat = normalize(allMesgChat, schemaAuthorList);

    console.log(JSON.stringify(allMesgChat).length);
    console.log(JSON.stringify(normalizedChat).length);

    res.json(normalizedChat)



    //Sirve para la petición HTTP
    // res.json({ msg: "Messages from chat", historialMessages: allMesgChat });

    // Sirve para SocketIo
    // res.render("websocket",allMesgChat);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

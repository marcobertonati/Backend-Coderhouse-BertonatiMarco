const MessagesChatService = require("../services/messagesChat");
const messageChat = new MessagesChatService();

const util = require('util')

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
    const allMsgChat = await messageChat.getAllMessage();

    const historyChat = { id: 1, content: allMsgChat};

    // console.log(historyChat)

    // /*NORMALIZAR */    
    // const schemaAuthor = new schema.Entity('author', {
   
    // }, {idAttribute: (value) => value.author.id});


    // // const schemaAuthorList = new schema.Array(schemaAuthor)
    // const schemaAuthorList = new schema.Array(schemaAuthor)


    // const normalizedChat = normalize(allMsgChat, schemaAuthorList);

    // console.log(JSON.stringify(allMsgChat).length);
    // console.log(JSON.stringify(normalizedChat).length);

    // res.json(normalizedChat)


    const userSchema = new schema.Entity('authors');
    const entrySchema = new schema.Entity('entries', {
      author: userSchema
    }, {idAttribute: (value) => value._id}); /*Este es el ID del mensaje de chat */

    const chatSchema = new schema.Entity('chat', {
      content: [entrySchema]
    })

    console.log(JSON.stringify(allMsgChat).length);
    console.log(JSON.stringify(chatSchema).length);


    const normalizedChat = normalize(historyChat, chatSchema);

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

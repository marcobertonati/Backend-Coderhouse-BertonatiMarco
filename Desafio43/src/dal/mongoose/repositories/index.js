const ModelMessagesMongoose = require("../dao/models/messagesMongoose");
const MessageRepository = require("./messageRepository");
// const model = new MessageRepository();

module.exports = {
  messagesRepository: new MessageRepository(ModelMessagesMongoose),
};

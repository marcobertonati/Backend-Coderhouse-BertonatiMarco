const messagesChat = require("../dal/mongoose/schemas/messagesMongoose");

module.exports = class {
  async createMessage(msg) {
    await messagesChat.create(msg);
  }

  async getAllMessage() {
    const allMessage = await messagesChat.find().lean();
    return allMessage;
  }
};

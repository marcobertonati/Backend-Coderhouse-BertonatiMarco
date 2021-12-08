const BaseRepository = require("./baseRepository");

class MessageRepository extends BaseRepository {
  constructor(model) {
    super();
    this.model = model;
  }

  async getAllMsg() {
    console.log("Ingreso al getAllMsg de messageRepository");
    const messages = await this.model.find().lean();
    console.log("Ingreso a MessageRepository");
    return messages;
  }
}

module.exports = MessageRepository;

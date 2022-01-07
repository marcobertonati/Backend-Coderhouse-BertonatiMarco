const BaseRepository = require("./baseRepository");

class MessageRepository extends BaseRepository {
  constructor(model) {
    super();
    this.model = model;
  }

  async getAllMsg() {
    const messages = await this.model.find().lean();
    return messages;
  }

  async getMsgByEmail(email) {
    const response = await this.model.find({"author.id": email});
    return response;
  }
}

module.exports = MessageRepository;

const BaseRepository = require("./baseRepository");

class MessageRepository extends BaseRepository {
  constructor(model) {
    super();
    this.model = model;
  }

  async getAllMsg() {
    const messages = await this.model;
    return messages;
  }
}

module.exports = MessageRepository;

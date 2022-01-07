class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    const elements = await this.model;
    return elements;
  }

  async getById(id) {
    const element = await this.model.filter((element) => element._id == id);
    return element;
  }

  async create(element) {
    const elementCreated = await this.model.push(element);
    return elementCreated;
  }

  async delete(id) {
    const elementDeleted = await this.model.filter(
      (element) => element._id != id
    );
    return elementDeleted;
  }

  async update(id, payload) {

    const msgFinded = this.model.findIndex((element) => element._id == id);
    if (msgFinded < -1) {
      return { msg: "No se encontró chat" };
    }

    this.model[msgFinded] = {
      text: payload,
    };

    return this.model[msgFinded];
  }
}

module.exports = BaseRepository;

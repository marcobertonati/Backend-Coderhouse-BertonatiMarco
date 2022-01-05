class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    const elements = await this.model.find();
    return elements;
  }

  async getById(id) {
    const element = await this.model.findById(id);
    return element;
  }

  async create(element) {
    const elementCreated = await this.model.create(element);
    return elementCreated;
  }

  async delete(id) {
    const elementDeleted = await this.model.findByIdAndDelete(id);
    return elementDeleted;
  }

  async update(id, payload) {
    const elementUpdated = await this.model.findByIdAndUpdate(id, payload);
    return elementUpdated;
  }
}

module.exports = BaseRepository;

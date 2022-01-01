const { userModel } = require("../../schemas/userMongoose");

module.exports = class {
  constructor() {
    this.user = userModel;
  }

  async findUserByEmail(email) {
    return await this.user.findOne({ email: email.email });
  }

  async findUserById(id) {
    return await this.user.findById(id);
  }

  async createUser(userToCreate) {
    return await this.user.create(userToCreate);
  }
};

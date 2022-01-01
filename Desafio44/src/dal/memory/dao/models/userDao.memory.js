const userModel = require("../../../../../__test__/mock/user.mock");

module.exports = class {
  constructor() {
    this.users = userModel;
  }

  async findUserByEmail({ email }) {
    console.log(this.users);
    const [result] = await this.users.filter((user) => user.email == email);
    if (!result) {
      return false;
    }
    return result;
  }

  async findUserById(id) {
    const result = await this.users.filter((user) => user._id == id);
    return result;
  }

  async createUser(userToCreate) {
    return await this.users.push(userToCreate);
  }
};

const mockOrder = require("../../../../../__test__/mock/orders.mock");

module.exports = class {
  constructor() {
    this.orders = mockOrder;
  }

  async create(order) {
    const orderToPush = order;
    await this.orders.push(order);
  }

  async find() {
    const response = await this.orders;
    return response;
  }
};

const { PERSISTENCE } = require("../config/globals");
const persistenceFactory = require("../dal/factory");
let { persistenceOrder } = persistenceFactory.newPersistence(PERSISTENCE);

module.exports = class {
  constructor() {
    this.orderModel = persistenceOrder;
  }

  async createOrder(order) {
    return await this.orderModel.create(order);
  }

  async getAllOrders() {
    return await this.orderModel.find();
  }
};

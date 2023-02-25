const { models } = require('./../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    // The relations can be nested as deep as you want
    const order = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user'],
      }],
    });
    return order;
  }

  async delete(id) {
    const deleted = await this.findOne(id);
    const response = await deleted.destroy();
    return response;
  }
}

module.exports = OrderService;

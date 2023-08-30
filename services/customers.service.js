const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    const newCustomer = await models.Customer.create(newData, {
      include: ['user'],
    });

    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    const response = await models.Customer.findAll({
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
      ],
    });
    return response;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
      ],
    });
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const response = await customer.update(changes);
    return response;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    const response = await customer.destroy();
    return response;
  }
}

module.exports = CustomerService;

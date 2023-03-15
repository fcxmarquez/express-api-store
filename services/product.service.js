const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);

    return newProduct;
  }

  async find(query) {
    const { limit, offset } = query;
    const options = {
      include: ['category'],
      limit: limit || 10,
      offset,
    };

    const response = await models.Product.findAll({
      ...options,
    });

    return response;
  }

  async findOne(productId) {
    const product = await models.Product.findByPk(productId, {
      include: ['category'],
    });

    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is block');
    }
    return product;
  }

  async update(id, data) {
    const product = await this.findOne(id);
    const response = await product.update(data);

    return response;
  }

  async delete(id) {
    const product = await this.findOne(id);
    const response = await product.destroy();

    return response;
  }
}

module.exports = ProductsService;

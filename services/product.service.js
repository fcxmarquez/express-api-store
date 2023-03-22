const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);

    return newProduct;
  }

  async find(req) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    const totalProducts = await models.Product.count();
    const totalPages = Math.ceil(totalProducts / limit);

    const currentPage = req.query.page || 1;

    const next =
      currentPage < totalPages
        ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${
            parseInt(currentPage) + 1
          }`
        : null;
    const prev =
      currentPage > 1
        ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${
            parseInt(currentPage) - 1
          }`
        : null;

    const products = await models.Product.findAll({
      limit,
      offset,
    });

    const response = {
      info: {
        count: totalProducts,
        pages: totalPages,
        next: next,
        prev: prev,
      },
      results: products,
    };

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

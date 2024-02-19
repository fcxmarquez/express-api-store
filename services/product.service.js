const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("../libs/sequelize");

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
    const price = req.query.price || null;
    const price_min = req.query.price_min || null;
    const price_max = req.query.price_max || price_min + 1000000;

    const totalProducts = await models.Product.count();
    const totalPages = Math.ceil(totalProducts / limit);

    const currentPage = req.query.page || 1;

    const next =
      currentPage < totalPages
        ? `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${
            parseInt(currentPage, 10) + 1
          }`
        : null;
    const prev =
      currentPage > 1
        ? `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${
            parseInt(currentPage, 10) - 1
          }`
        : null;

    const where = {};
    if (price !== null) {
      where.price = price;
    }
    if (price_min !== null) {
      where.price = {
        [Op.between]: [price_min, price_max],
      };
    }

    const products = await models.Product.findAll({
      limit,
      offset: where ? null : offset,
      where,
      order: [["id", "ASC"]],
    });

    const info = {
      count: totalProducts,
      pages: totalPages,
      next,
      prev,
    };

    const response = {
      info: undefined,
      results: products,
    };

    if (!Object.keys(where).length > 0) response.info = info;

    return response;
  }

  async findOne(productId) {
    const product = await models.Product.findByPk(productId, {
      include: ["category"],
    });

    if (!product) {
      throw boom.notFound("Product not found");
    }
    if (product.isBlock) {
      throw boom.conflict("Product is block");
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

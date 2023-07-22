const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const description = Joi.string().min(10).max(100);
const categoryId = Joi.number().integer();

const limit = Joi.number().integer().min(1).max(100);
const page = Joi.number().integer().min(1);
const price_min = Joi.number().integer().min(10);
const price_max = Joi.number().integer().min(10);

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
});

const getProductSchema = Joi.object({
  productId: id.required(),
});

const queryProductSchema = Joi.object({
  limit: limit.default(10),
  page: page,
  price: price,
  price_min: price_min.when('price', {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.when('price_max', {
      is: Joi.exist(),
      then: Joi.required(),
    }),
  }),
  price_max: price_max.when('price', {
    is: Joi.exist(),
    then: Joi.forbidden(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};

const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const { models } = require("../libs/sequelize");

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const response = await models.User.findAll({
      include: ["customer"],
      attributes: { exclude: ["password"] },
    });
    return response;
  }

  async findByEmail(email) {
    const response = await models.User.findOne({
      where: { email },
      include: ["customer"],
    });
    return response;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("User not found");
    }

    delete user.dataValues.password;
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound("User not found");
    }

    const response = await user.destroy();
    return response;
  }
}

module.exports = UserService;

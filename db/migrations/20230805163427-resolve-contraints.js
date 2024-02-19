const { CUSTOMER_TABLE } = require("../models/customer.model");
const { PRODUCT_TABLE } = require("../models/product.model");
const { ORDER_TABLE } = require("../models/order.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, "user_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn(PRODUCT_TABLE, "category_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn(ORDER_TABLE, "customer_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn(PRODUCT_TABLE, "category_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn(ORDER_TABLE, "customer_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};

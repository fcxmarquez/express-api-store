'use strict';

const { ORDER_PRODUCT_TABLE } = require('./../models/order-product.model');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(ORDER_PRODUCT_TABLE, 'order_id', {
      type: DataTypes.INTEGER,
      unique: false,
    });
    await queryInterface.changeColumn(ORDER_PRODUCT_TABLE, 'product_id', {
      type: DataTypes.INTEGER,
      unique: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.changeColumn(ORDER_PRODUCT_TABLE, 'order_id', {
      type: DataTypes.INTEGER,
      unique: true,
    });
    await queryInterface.changeColumn(ORDER_PRODUCT_TABLE, 'product_id', {
      type: DataTypes.INTEGER,
      unique: true,
    });
  },
};

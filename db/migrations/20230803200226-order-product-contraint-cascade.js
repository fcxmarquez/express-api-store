const { ORDER_PRODUCT_TABLE } = require('../models/order-product.model');
const { ORDER_TABLE } = require('../models/order.model');
const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(ORDER_PRODUCT_TABLE, 'order_id', {
      type: Sequelize.INTEGER,
      references: {
        model: ORDER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.changeColumn(ORDER_PRODUCT_TABLE, 'product_id', {
      type: Sequelize.INTEGER,
      references: {
        model: PRODUCT_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(ORDER_PRODUCT_TABLE, 'order_id', {
      type: Sequelize.INTEGER,
      references: {
        model: ORDER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.changeColumn(ORDER_PRODUCT_TABLE, 'product_id', {
      type: Sequelize.INTEGER,
      references: {
        model: PRODUCT_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
};

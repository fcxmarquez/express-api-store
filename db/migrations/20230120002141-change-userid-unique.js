'use strict';
const { DataTypes } = require('sequelize');


const {
  CUSTOMER_TABLE,
} = require('./../models/customer.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      unique: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    }); // We need to add the references again because the changeColumn method removes them
  },

  async down(queryInterface) {
    //await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};

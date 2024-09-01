const { USER_TABLE } = require("../models/user.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, "recovery_token", {
      allowNull: true,
      type: Sequelize.STRING,
      field: "recovery_token",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, "recovery_token");
  },
};

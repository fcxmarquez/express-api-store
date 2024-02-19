const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./user.model");

const CUSTOMER_TABLE = "customers";

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "last_name",
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: "created_at",
  },
  userId: {
    field: "user_id",
    unique: true,
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE", // If the user id is updated, update the customer's user id
    onDelete: "CASCADE",
  },
};

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: "user" });
    this.hasMany(models.Order, { as: "orders", foreignKey: "customerId" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: "Customer",
      timestamps: false,
    };
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };

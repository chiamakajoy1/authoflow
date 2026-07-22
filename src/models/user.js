const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const user = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("ADMIN", "HOSPITAL", "INSURANCE"),
      allowNull: false,
      defaultValue: "HOSPITAL",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = user;
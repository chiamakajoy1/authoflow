const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patient = sequelize.define(
  "Patient",
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

    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    gender: {
      type: DataTypes.ENUM("MALE", "FEMALE", "OTHER"),
      allowNull: false,
    },

    insuranceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    hospitalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "patients",
    timestamps: true,
  }
);

module.exports = Patient;
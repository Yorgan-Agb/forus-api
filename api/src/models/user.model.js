import { sequelize } from "../database/sequelize-client.js";
import { DataTypes, Model } from "sequelize";

export default class User extends Model {}

User.init(
  {
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    pseudo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
  }
);

import { sequelize } from '../database/sequelize-client.js';
import { DataTypes, Model } from 'sequelize';

export class User extends Model {}

User.init(
  {
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    auth0_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
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

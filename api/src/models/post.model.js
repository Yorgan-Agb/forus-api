import { sequelize } from "../database/sequelize-client.js";
import { DataTypes, Model } from "sequelize";

export class Post extends Model {}

Post.init(
  {
    post: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Post",
  }
);

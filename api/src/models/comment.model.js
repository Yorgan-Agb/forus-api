import { sequelize } from "../database/sequelize-client.js";
import { DataTypes, Model } from "sequelize";

export default class Comment extends Model {}

Comment.init(
  {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comment",
  }
);

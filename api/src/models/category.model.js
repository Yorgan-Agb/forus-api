import { sequelize } from "../database/sequelize-client.js";

import { DataTypes, Model } from "sequelize";

export class Category extends Model {}

Category.init(
  {
    category_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Category",
  }
);

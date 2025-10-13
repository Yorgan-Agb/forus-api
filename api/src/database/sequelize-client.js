import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

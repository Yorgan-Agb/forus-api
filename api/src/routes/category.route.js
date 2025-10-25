import { Router } from "express";
import { getAllCategories } from "../controllers/category.controller.js";
import { jwtCheck } from "../middlewares/auth.middleware.js";

export const categoryRouter = Router();

categoryRouter.get("/all", getAllCategories);

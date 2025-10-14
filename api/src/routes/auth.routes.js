import express from "express";
import { register } from "../controllers/auth.controller.js";
import { registerSchema } from "../middlewares/user.middleware.js";

export const authRoutes = express.Router();
authRoutes.post("/register", registerSchema, register);

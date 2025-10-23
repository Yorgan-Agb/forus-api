import { Router } from "express";
import { jwtCheck } from "../middlewares/auth.middleware.js";
import { completeProfile } from "../controllers/user.controller.js";
import { validateUserProfile } from "../middlewares/validateProfile.middleware.js";

export const userRouter = Router();

userRouter.post(
  "/complete-profile",
  jwtCheck,
  validateUserProfile,
  completeProfile
);

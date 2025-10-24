import { Router } from "express";
import { jwtCheck } from "../middlewares/auth.middleware.js";
import { getUserFromToken } from "../middlewares/auth.middleware.js";
import { validateUserProfile } from "../middlewares/validateProfile.middleware.js";
import {
  completeProfile,
  seeMyProfile,
  modifyProfile,
} from "../controllers/user.controller.js";

export const userRouter = Router();

// Create a route for completing user profile
userRouter.post(
  "/complete-profile",
  jwtCheck,
  validateUserProfile,
  completeProfile
);

// Create a route for see user profile
userRouter.get("/me", jwtCheck, getUserFromToken, seeMyProfile);

// Create a route for modifying user profile
userRouter.put(
  "/modify-profile",
  jwtCheck,
  getUserFromToken,
  validateUserProfile,
  modifyProfile
);

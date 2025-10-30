import { Router } from 'express';
import { generateManagementApiToken } from '../controllers/auth.controller.js';
export const authRouter = Router();

authRouter.post('/management-token', generateManagementApiToken);

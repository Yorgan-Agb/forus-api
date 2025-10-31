import { Router } from 'express';
import { generateManagementApiToken, registration } from '../controllers/auth.controller.js';
export const authRouter = Router();

authRouter.post('/management-token', generateManagementApiToken);
authRouter.post('/registration', registration);

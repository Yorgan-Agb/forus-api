import { Router } from 'express';
import { getAllCategories } from '../controllers/category.controller.js';
import { checkRole } from '../middlewares/role.middleware.js';
import { jwtCheck } from '../middlewares/auth.middleware.js';

export const categoryRouter = Router();

categoryRouter.get('/all', jwtCheck, checkRole('Admin'), getAllCategories);

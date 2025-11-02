import { Router } from 'express';
import { validateCategory } from '../middlewares/category.middleware.js';
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from '../controllers/category.controller.js';
import { checkRole } from '../middlewares/role.middleware.js';
import { jwtCheck } from '../middlewares/auth.middleware.js';

export const categoryRouter = Router();

categoryRouter
  .get('/all', getAllCategories)
  .post('/create', jwtCheck, checkRole('Admin'), validateCategory, createCategory)
  .delete('/delete/:id', jwtCheck, checkRole('Admin'), deleteCategory);

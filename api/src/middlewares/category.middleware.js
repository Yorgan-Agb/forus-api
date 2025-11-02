import { categorySchema } from '../schemas/category.schema.js';

export const validateCategory = (req, res, next) => {
  const { error, value } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map((detail) => detail.message),
    });
  }
  req.body = value;
  next();
};

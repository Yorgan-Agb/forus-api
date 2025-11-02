import Joi from 'joi';

export const categorySchema = Joi.object({
  category_name: Joi.string().trim().min(4).max(50).required(),
});

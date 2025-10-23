import Joi from "joi";

export const userSchema = Joi.object({
  firstname: Joi.string().trim().min(2).max(50).required(),
  lastname: Joi.string().trim().min(2).max(70).required(),
  pseudo: Joi.string().trim().min(2).max(30).required(),
});

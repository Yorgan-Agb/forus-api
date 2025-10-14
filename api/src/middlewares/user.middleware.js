import Joi from "joi";
import { checkBody } from "../../utils/common.utils.js";
export const registerSchema = (req, res, next) => {
  const createSchema = Joi.object({
    firstname: Joi.string().max(50).required(),
    lastname: Joi.string().max(100).required(),
    pseudo: Joi.string().max(30).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(8).max(100).required(),
    passwordValidation: Joi.string().required(),
  });
  checkBody(createSchema, req.body, req, res, next);
};

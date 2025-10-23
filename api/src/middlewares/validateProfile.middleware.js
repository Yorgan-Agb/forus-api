import { userSchema } from "../schemas/user.schema.js";

export const validateUserProfile = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((detail) => detail.message),
    });
  }
  req.body = value;
  next();
};

import { StatusCodes } from "http-status-codes";

export const checkBody = (schema, body, req, res, next) => {
  const validation = schema.validate(body);
  if (validation.error) {
    res.status(StatusCodes.BAD_REQUEST).send(validation.error);
    return;
  }
  next();
};

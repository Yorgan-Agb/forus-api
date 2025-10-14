import { User } from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import argon2 from "argon2";

export const register = async (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, password, passwordValidation, pseudo } =
    req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      res.status(StatusCodes.CONFLICT).send("User already exists");
    }

    const hashedPassword = await argon2.hash(password);
    if (password !== passwordValidation) {
      res.status(StatusCodes.BAD_REQUEST).send("Password does not match");
      return;
    }

    const newUser = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
      pseudo: pseudo,
    });

    if (newUser) {
      res.status(StatusCodes.CREATED).json({
        message: "User created successfully",
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        pseudo: newUser.pseudo,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

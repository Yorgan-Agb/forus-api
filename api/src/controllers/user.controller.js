import "dotenv/config";
import { User } from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";

export const completeProfile = async (req, res) => {
  try {
    const auth0_id = req.auth.payload.sub;
    const { firstname, lastname, pseudo } = req.body;
    const email = req.auth.payload[`${process.env.AUTH_AUDIENCE}/email`];
    const user = await User.findOne({ where: { auth0_id } });
    if (!user) {
      const newUser = await User.create({
        auth0_id,
        firstname: firstname,
        lastname: lastname,
        pseudo: pseudo,
        email: email,
      });
      return res.status(StatusCodes.CREATED).json(newUser);
    } else {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "User already exists" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const seeMyProfile = async (req, res) => {
  try {
    const user = req.user;

    if (user) {
      res.status(StatusCodes.OK).json({
        firstname: user.firstname,
        lastname: user.lastname,
        pseudo: user.pseudo,
        email: user.email,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const modifyProfile = async (req, res) => {
  try {
    const user = req.user;
    const { firstname, lastname, pseudo } = req.body;

    if (user) {
      user.firstname = firstname;
      user.lastname = lastname;
      user.pseudo = pseudo;

      await user.save();
      res.status(StatusCodes.OK).json(user);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

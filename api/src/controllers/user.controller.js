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

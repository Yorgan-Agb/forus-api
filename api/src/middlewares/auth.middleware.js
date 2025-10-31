import { auth } from 'express-oauth2-jwt-bearer';

import 'dotenv/config';
import { User } from '../models/user.model.js';

console.log('AUTH_AUDIENCE:', process.env.AUTH_AUDIENCE);
console.log('AUTH_ISSUER_BASE_URL:', process.env.AUTH_ISSUER_BASE_URL);

export const jwtCheck = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256',
});

export const getUserFromToken = async (req, res, next) => {
  try {
    const payload = req.auth.payload || req.auth;

    const auth0_id = payload.sub;

    const email = payload[`${process.env.AUTH_AUDIENCE}/email`];

    const findUser = await User.findOne({ where: { auth0_id } });

    if (findUser) {
      req.user = findUser;
      return next();
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error dans getUserFromToken:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const isExistingUser = async (req, res, next) => {
  try {
    const payload = req.auth.payload || req.auth;

    const auth0_id = payload.sub;

    const email = payload[`${process.env.AUTH_AUDIENCE}/email`];
    const findUser = await User.findOne({ where: { auth0_id } });
    if (findUser) {
      req.user = findUser;
      return next();
    }
  } catch (error) {
    console.error('Error dans isExistingUser:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
  next();
};

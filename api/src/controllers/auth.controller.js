import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.model.js';

export const generateManagementApiToken = async () => {
  try {
    const response = await fetch(`${process.env.AUTH_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.AUTH_CLIENT_ID,
        client_secret: process.env.AUTH_CLIENT_SECRET,
        audience: process.env.MANAGEMENT_API_AUDIENCE,
      }),
    });
    const tokenData = await response.json();
    return tokenData.access_token;
  } catch (error) {
    console.error('Error generating Management API token:', error);
    throw error;
  }
};

export const registration = async (req, res) => {
  try {
    const { email, password } = req.body;
    const connexion = process.env.AUTH_DB_CONNECTION;

    const managementToken = await generateManagementApiToken();
    let payload = JSON.stringify({
      email: email,
      email_verified: false,
      password: password,
      verify_email: false,
      connection: connexion,
    });

    const response = await fetch(`${process.env.AUTH_ISSUER_BASE_URL}/api/v2/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${managementToken}`,
      },
      body: payload,
    });
    if (response.status === 201) {
      const result = await response.json();
      return res.status(StatusCodes.CREATED).json(result);
    } else {
      const errorResult = await response.json();
      return res.status(response.status).json(errorResult);
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';

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
    const roleId = process.env.USER_ROLE_ID;
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
    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: 'Error creating user in Auth0',
        error: result,
      });
    }

    const userId = result.user_id;
    const giveRole = await fetch(
      `${process.env.AUTH_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${managementToken}`,
          cache: 'no-cache',
        },
        body: JSON.stringify({
          roles: [roleId],
        }),
      }
    );

    if (!giveRole.ok) {
      return res.status(giveRole.status).json({
        message: 'User created but error assigning role',
        error: 'Failed to assign role',
      });
    }

    if (response.ok && giveRole.ok) {
      const tokenResponse = await fetch(`${process.env.AUTH_ISSUER_BASE_URL}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'password',
          client_id: process.env.AUTH_CLIENT_ID,
          client_secret: process.env.AUTH_CLIENT_SECRET,
          audience: process.env.AUTH_AUDIENCE,
          username: email,
          password: password,
          scope: 'openid profile email',
        }),
      });
      const tokenData = await tokenResponse.json();
      if (tokenResponse.ok) {
        return res.status(StatusCodes.CREATED).json({
          message: 'User registered successfully',
          access_token: tokenData.access_token,
          id_token: tokenData.id_token,
        });
      } else {
        return res
          .status(tokenResponse.status)
          .json({ message: 'Error obtaining tokens', error: tokenData });
      }
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

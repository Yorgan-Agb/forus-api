import 'dotenv/config';


export const generateManagementApiToken = async () => {
  try {
    const response = await fetch(
      `https://${process.env.AUTH_ISSUER_BASE_URL}/oauth/token`,
      {
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
      }
    );
    const tokenData = await response.json();
    return tokenData.access_token;
  } catch (error) {
    console.error('Error generating Management API token:', error);
    throw error;
  }
};

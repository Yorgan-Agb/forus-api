import 'dotenv/config';

export const checkRole = (role) => {
  return (req, res, next) => {
    try {
      const userRoles = req.auth.payload[`${process.env.AUTH_AUDIENCE}/role`];
      if (userRoles && userRoles.includes(role)) {
        return next();
      } else {
        return res.status(403).json({ message: 'Forbidden: Insufficient role' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

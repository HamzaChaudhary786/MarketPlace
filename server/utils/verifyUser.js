import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const verifyToken = (req, res, next) => {
  // Check if the token exists in cookies
  const token = req.cookies?.access_token;  // Optional chaining to prevent errors if cookies are undefined

  console.log(token, "token is");

  if (!token) {
    return next(errorHandler(401, 'Unauthorized: No token provided'));
  }

  // Verify the token using JWT
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.error('Token verification error:', err.message); // More detailed logging
      return next(errorHandler(403, 'Forbidden: Token is invalid or expired'));
    }

    req.user = user;
    next();
  });
};

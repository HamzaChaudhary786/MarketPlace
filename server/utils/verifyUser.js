import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;


  if (!token) return next(errorHandler(401, 'Unauthorized'));

  // Make sure to use JWT_SECRET_KEY for verification as well
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.error(err); // Optional: Log the error for debugging
      return next(errorHandler(403, 'Forbidden'));
    }

    req.user = user;
    next();
  });
};

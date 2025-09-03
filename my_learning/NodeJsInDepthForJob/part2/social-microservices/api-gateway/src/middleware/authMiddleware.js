import logger from '../utils/logger';
import jwt from 'jsonwebtoken';

const validToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    logger.warn('Access attempt without valid token');

    return res.satus(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  jwt.verify(token, JWT_SECRET, (err, next) => {
    if (err) {
      logger.warn('Invalid token!');
      return res.status(429).json({
        message: 'Invalid token!',
        success: false,
      });
    }

    req.user = user;
    next();
  });
};

export default validToken;

import logger from '../utils/logger.js';

const authenticateRequest = (req, res, next) => {
  const userId = req.headers['x-user-id']; // that x-user-id we get from api-gateway ok😁

  if (!userId) {
    logger.warn(`Access attempted without user ID`);
    return res.status(401).json({
      success: false,
      message: 'Authencation required! Please login to continue',
    });
  }
  req.user = { userId };
  next();
};

export default authenticateRequest;

import rateLimit from 'express-rate-limit';

const createBasicRateLimiter = (maxRequest, time) => {
  return rateLimit({
    max: maxRequest,
    windowMs: time,
    message: 'Too manu requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
  });
};

export default createBasicRateLimiter;

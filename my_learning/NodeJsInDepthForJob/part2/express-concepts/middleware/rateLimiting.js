import rateLimit from 'express-rate-limit';
//!  Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset
//! "Express rate limit" refers to using the express-rate-limit middleware in Node.js to protect an Express.js application by limiting the number of requests a client can make within a specific time frame. This helps prevent abuse, denial-of-service (DoS) attacks, and brute force attacks by restricting requests and returning a 429 Too Many Requests error when limits are exceeded. The middleware is configured with a time window (e.g., one minute) and a maximum number of allowed requests (e.g., 200 per IP address).

const createBasicRateLimiter = (maxRequests, time) => {
  return rateLimit({
    max: maxRequests,
    windowMs: time,
    message: 'Too many requests, please try again later',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
};

export { createBasicRateLimiter };

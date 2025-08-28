import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';
import adminMiddleware from '../middleware/admin-middleware.js';
const router = express.Router();

router.get('/welcome', authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Home Page 🏠',
  });
});

export default router;

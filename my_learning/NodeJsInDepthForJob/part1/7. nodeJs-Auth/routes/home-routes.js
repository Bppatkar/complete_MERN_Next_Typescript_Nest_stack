import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';
const router = express.Router();

router.get('/welcome', authMiddleware, (req, res) => {
  const { username, userId, role } = req.userInfo;

  res.json({
    success: true,
    message: 'Welcome to the Home Page 🏠',
    user: {
      _id: userId,
      username,
      role,
    },
  });
});

export default router;

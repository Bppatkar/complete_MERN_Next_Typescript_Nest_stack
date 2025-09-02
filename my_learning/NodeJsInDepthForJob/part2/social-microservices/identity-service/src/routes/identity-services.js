import express from 'express';
import {
  refreshTokenUser,
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/identity-controller';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/refresh-token').post(refreshTokenUser);
router.route('/logout').post(logoutUser);

export default router;

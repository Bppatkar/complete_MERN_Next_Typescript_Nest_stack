import RefreshToken from '../models/RefreshToken.js';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import logger from '../utils/logger.js';
import { validateRegistration, validateLogin } from '../utils/validation.js';

//! register user
const registerUser = async (req, res) => {
  logger.info('Registration endpoint hit....');
  try {
    //* validate the schema
    const { error } = validateRegistration(req.body);
    if (error) {
      logger.warn('Validation error', error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { username, email, password } = req.body;

    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      logger.warn('User already exists');
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    user = new User({ username, email, password });
    await user.save();

    logger.info('user saved successfully ', user._id.toString());

    const { accessToken, refreshToken } = await generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User Registered Successfully',
      accessToken,
      refreshToken,
      userId: user._id,
    });
  } catch (error) {
    logger.error('Registration error occurred', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

//! loginUser
const loginUser = async (req, res) => {
  logger.info('Login Endpoint hit....');
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      logger.warn('validation error', error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn('Invalid User');
      return res.status(400).json({
        success: false,
        message: 'Invalid Credentials',
      });
    }

    //* user password is valid or not

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      logger.warn('Invalid Password');
      return res.status(400).json({
        success: false,
        message: 'Invalid Credentials',
      });
    }

    const { accessToken, refreshToken } = await generateToken(user);

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      userId: user._id,
      message: 'Login successful',
    });
  } catch (error) {
    logger.error('Login error occurred', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

//! refreshToken
const refreshTokenUser = async (req, res) => {
  logger.info('Refresh Token endpoint hit.....');
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      logger.warn('Refresh Token is missing...');
      return res.status(400).json({
        success: false,
        message: 'Refresh Token is missing',
      });
    }

    const storedToken = await RefreshToken.findOne({ token: refreshToken });

    if (!storedToken) {
      logger.warn('Invalid refresh token provided');
      return res.status(400).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }

    if (storedToken.expiresAt < new Date()) {
      logger.warn('Expired Refresh Token');
      // clean up expired token
      await RefreshToken.deleteOne({ _id: storedToken._id });
      return res.status(401).json({
        success: false,
        message: 'Expired Refresh Token',
      });
    }

    const user = await User.findById(storedToken.user);
    if (!user) {
      logger.warn('User not found');
      // Clean up orphaned token
      await RefreshToken.deleteOne({ _id: storedToken._id });
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    //* delete the old refresh Token
    await RefreshToken.deleteOne({ _id: storedToken._id });

    //* Generate new token
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await generateToken(user);

    res.json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    logger.error('Refresh Token error occurred', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

//! logout
const logoutUser = async (req, res) => {
  logger.info('Logout endpoint hit....');

  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      logger.warn('Refresh token missing');
      return res.status(400).json({
        success: false,
        message: 'Refresh token missing',
      });
    }

    const storedToken = await RefreshToken.findOneAndDelete({
      token: refreshToken,
    });
    if (!storedToken) {
      logger.warn('Invalid refresh token provided for logout');
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }
    logger.info('Refresh Token deleted for logout', {
      userId: storedToken.user,
    });
    res.status(200).json({
      success: true,
      message: 'Logged out successfully!',
    });
  } catch (error) {
    logger.error('Error while Logging Out', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export { registerUser, loginUser, logoutUser, refreshTokenUser };

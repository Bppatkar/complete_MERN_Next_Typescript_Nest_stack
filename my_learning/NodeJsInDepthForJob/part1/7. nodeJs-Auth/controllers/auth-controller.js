import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// register controller
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role = 'user' } = req.body;

    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields (username, email, password) are required',
      });
    }

    // validating the pass
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkExistingUser) {
      const conflictField =
        checkExistingUser.username === username ? 'username' : 'email';
      return res.status(409).json({
        success: false,
        message: `User with this ${conflictField} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRegisteredUser = await User.create({
      username,
      email,
      password: hashedPassword,
      // role: role || 'user', // we already make it default upper so no need to write like this
      role,
    });

    // Prepare response data (excluding sensitive information)
    const userResponse = {
      _id: newRegisteredUser._id,
      username: newRegisteredUser.username,
      email: newRegisteredUser.email,
      role: newRegisteredUser.role,
      createdAt: newRegisteredUser.createdAt,
    };
    if (newRegisteredUser) {
      res.status(201).json({
        success: true,
        message: `User ${username} Registered Successfully`,
        data: userResponse,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Unable to register user! please try again.',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong please try again later !!!',
    });
  }
};

// login controller
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Both fields (username, password) are required',
      });
    }

    //find if the current user is exists in database or not
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Credential || Password Does not match',
      });
    }

    // create user token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '7d' }
    );

    // set refresh token as HTTP-only cookies
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // response data
    const userResponseData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken,
    };

    return res.status(200).json({
      success: true,
      message: 'Logged In Successfully',
      data: userResponseData,
    });
  } catch (error) {
    console.error(error);

    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Something went wrong please try again later !!!',
    });
  }
};

// password change
const passChange = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    //extract old and new password
    const { oldPass, newPass } = req.body;

    // Validate new password length
    if (newPass.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters',
      });
    }

    // finding the current logged in user
    const user = await User.findById(userId).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // check if the old password is correct
    const isPassMatch = await bcrypt.compare(oldPass, user.password);
    if (!isPassMatch) {
      return res.status(401).json({
        success: false,
        message: 'old Password is not correct! Please try again later',
      });
    }

    // check if new password is diffrent
    if (oldPass === newPass) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from current password',
      });
    }

    // hasing the new password here
    const newHashedPass = await bcrypt.hash(newPass, 12);
    user.password = newHashedPass;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password Change Successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong please try again later !!!',
    });
  }
};

export { registerUser, loginUser, passChange };

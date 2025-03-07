import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(401).json({
        success: false,
        message:
          "All field are required , so please fill all the field carefully",
      });
    }
    // finding the user via email, if already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "this email is already registered, please use another one",
      });
    }

    // password hashing using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating new use
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "Account created successfully 👤",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Both fields are mandatory to fill",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "incorrect email and password or maybe you are not registered",
      });
    }
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch)
      return res.status(403).json({
        success: false,
        message: "Password do not match",
      });

    // using jwt and attaching token in login
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true, // prevent javascript access
      secure: true,
      sameSite: "strict",
      maxAge: new Date(Date.now() + 3600000), // 1 hour-hourly
    });

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullName}`,
      user: { fullName: user.fullName, email: user.email }, // Send user details
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    // Get user ID from req (Middleware already verified the JWT)
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

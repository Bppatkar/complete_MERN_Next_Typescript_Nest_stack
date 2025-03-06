import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password)
      return res.status(403).json({
        success: false,
        message: "All field are required... please fill carefully",
      });

    // finding the user , already registered or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        success: false,
        message: "This email is already registered, please use another one",
      });
    }

    //for password downloading bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    // for checking this bcrypt we have to use api so we create route folder for api
    return res.status(201).json({
      success: true,
      message: "Account Created Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(403).json({
        success: false,
        message: "Incorrect email or password",
      });
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch)
      return res.status(403).json({
        success: false,
        message: "Password do not match",
      });
    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullName}`,
    });
  } catch (error) {
    console.log(error);
  }
};
// now we create api for login [go to routes]
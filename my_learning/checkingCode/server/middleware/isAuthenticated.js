import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  console.log("Cookies received:", req.cookies); // Debugging
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

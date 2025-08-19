import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // console.log(authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided. Please login to continue',
    });
  }

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided. Please login to continue',
    });
  }

  // decode the token
  try {
    const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decodeTokenInfo);

    req.userInfo = decodeTokenInfo;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Access denied. No token provided. Please login to continue',
    });
  }
};

export default authMiddleware;

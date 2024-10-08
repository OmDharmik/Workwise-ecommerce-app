// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ status: false, msg: 'Unauthorized access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ status: false, msg: 'Invalid token' });
  }
};

module.exports = authMiddleware;

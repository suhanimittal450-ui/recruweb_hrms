const jwt = require("jsonwebtoken");
const User = require("../models/auth/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Populate role so downstream middleware/controllers (e.g. roleMiddleware,
    // which reads req.user.role.name) get the actual role document rather
    // than a bare ObjectId.
    const user = await User.findById(decoded.id).populate("role");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = authMiddleware;

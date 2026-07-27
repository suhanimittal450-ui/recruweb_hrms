module.exports = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // If role is stored as a string
    const userRole =
      typeof req.user.role === "string" ? req.user.role : req.user.role?.name;

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    next();
  };
};

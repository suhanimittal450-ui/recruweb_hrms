const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      jti: crypto.randomUUID(), // unique token id
    },
    process.env.REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_EXPIRE || "7d",
    },
  );
};

module.exports = generateRefreshToken;

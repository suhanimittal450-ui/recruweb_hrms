const asyncHandler = require("../../middlewares/asyncHandler");
const authService = require("../../services/auth/authService");
const { setAuthCookies } = require("../../utils/cookie");

exports.register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});
exports.login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body.email, req.body.password);

  setAuthCookies(res, result.accessToken, result.refreshToken);

  // Remove password
  const user = result.user.toObject();
  delete user.password;
  res.status(200).json({
    success: true,
    message: "Login Successful",
    data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});
exports.changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  await authService.changePassword(req.user._id, oldPassword, newPassword);

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});
exports.logout = asyncHandler(async (req, res) => {
  const { clearAuthCookies } = require("../../utils/cookie");

  clearAuthCookies(res);

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});
exports.verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp, purpose } = req.body;

  await authService.verifyOTP(email, otp, purpose);

  res.status(200).json({
    success: true,
    message: "OTP verified successfully",
  });
});
exports.resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  await authService.resetPassword(email, otp, newPassword);

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});
exports.sendVerificationOTP = asyncHandler(async (req, res) => {
  await authService.sendVerificationOTP(req.body.email);

  res.status(200).json({
    success: true,
    message: "Verification OTP sent successfully",
  });
});
exports.verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  await authService.verifyEmail(email, otp);

  res.status(200).json({
    success: true,
    message: "Email verified successfully",
  });
});
exports.resendOTP = asyncHandler(async (req, res) => {
  const { email, purpose } = req.body;

  await authService.resendOTP(email, purpose);

  res.status(200).json({
    success: true,
    message: "OTP resent successfully",
  });
});
exports.forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);

  res.status(200).json({
    success: true,
    message: "OTP sent successfully to your email",
  });
});
exports.refreshToken = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken || req.cookies?.refreshToken;

  const result = await authService.refreshAccessToken(token);

  setAuthCookies(res, result.accessToken, result.refreshToken);

  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

exports.profile = asyncHandler(async (req, res) => {
  const user = await authService.profile(req.user._id);

  res.json({
    success: true,
    data: user,
  });
});

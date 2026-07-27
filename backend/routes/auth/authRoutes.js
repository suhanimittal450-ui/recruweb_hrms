const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth/authController");
const authMiddleware = require("../../middlewares/authMiddleware");
const validate = require("../../middlewares/validate");
const { registerValidator } = require("../../validators/authValidator");

router.post("/register", registerValidator, validate, authController.register);

router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/forgot-password", authController.forgotPassword);
router.get("/profile", authMiddleware, authController.profile);
router.post("/reset-password", authController.resetPassword);
router.post("/verify-otp", authController.verifyOTP);
router.post("/logout", authController.logout);
router.post("/verify-email", authController.verifyEmail);
router.post("/resend-otp", authController.resendOTP);
router.post("/change-password", authMiddleware, authController.changePassword);
router.post("/send-verification-otp", authController.sendVerificationOTP);
module.exports = router;

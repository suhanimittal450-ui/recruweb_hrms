const authRepository = require("../../repositories/auth/authRepository");
const refreshTokenRepository = require("../../repositories/auth/refreshTokenRepository");

const generateAccessToken = require("../../utils/generateAccessToken");
const generateRefreshToken = require("../../utils/generateRefreshToken");

const otpService = require("./otpService");

class AuthService {
  // ==========================
  // Register
  // ==========================
  async register(userData) {
    const existingUser = await authRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    // `role` on the User schema is a required ObjectId ref — it was never
    // being resolved/set here before, so every registration failed
    // Mongoose's required-field validation. Self-registration only offers a
    // safe subset of roles; SUPER_ADMIN/ADMIN are excluded on purpose (see
    // SELF_REGISTERABLE_ROLES) so this endpoint can't be used to grant full
    // platform control to anyone who signs up.
    const SELF_REGISTERABLE_ROLES = ["EMPLOYEE", "HR", "MANAGER", "TEAM_LEAD", "RECRUITER", "ACCOUNTANT"];
    const requestedRole = (userData.role || "EMPLOYEE").toUpperCase();
    const roleName = SELF_REGISTERABLE_ROLES.includes(requestedRole) ? requestedRole : "EMPLOYEE";

    const roleDoc = await authRepository.findRoleByName(roleName);
    if (!roleDoc) {
      throw new Error(
        `Role "${roleName}" does not exist yet — run the role seeder (npm run seed:roles) before registering users.`,
      );
    }

    const { role, ...rest } = userData;
    return await authRepository.create({ ...rest, role: roleDoc._id });
  }

  // ==========================
  // Login
  // ==========================
  async login(email, password) {
    const user = await authRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    // Revoke old refresh tokens
    await refreshTokenRepository.revokeAll(user._id);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await refreshTokenRepository.create({
      user: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      isRevoked: false,
    });

    return {
      user,
      accessToken,
      refreshToken,
      mustChangePassword: user.mustChangePassword || false,
    };
  }

  // ==========================
  // Profile
  // ==========================
  async profile(id) {
    return await authRepository.findById(id);
  }

  // ==========================
  // Refresh Token
  // ==========================
  async refreshAccessToken(token) {
    if (!token) {
      throw new Error("Refresh token is required");
    }

    const jwt = require("jsonwebtoken");

    try {
      jwt.verify(token, process.env.REFRESH_SECRET);
    } catch (err) {
      throw new Error("Invalid or expired refresh token");
    }

    const stored = await refreshTokenRepository.findByToken(token);

    if (!stored || stored.isRevoked || stored.expiresAt < new Date()) {
      throw new Error("Invalid or expired refresh token");
    }

    const user = stored.user;

    // Revoke current refresh token
    await refreshTokenRepository.revoke(token);

    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await refreshTokenRepository.create({
      user: user._id,
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      isRevoked: false,
    });

    return {
      user,
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  // ==========================
  // Forgot Password
  // ==========================
  async forgotPassword(email) {
    const user = await authRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    await otpService.sendOTP(user.email, user.firstName, "FORGOT_PASSWORD");

    return true;
  }

  // ==========================
  // Verify OTP
  // ==========================
  async verifyOTP(email, otp, purpose) {
    await otpService.verifyOTP(email, otp, purpose);

    return true;
  }

  // ==========================
  // Reset Password
  // ==========================
  async resetPassword(email, otp, newPassword) {
    await otpService.validateResetOTP(email, otp);

    const user = await authRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    user.password = newPassword;
    user.mustChangePassword = false;

    await user.save();

    await refreshTokenRepository.revokeAll(user._id);

    return true;
  }

  // ==========================
  // Send Verification OTP
  // ==========================
  async sendVerificationOTP(email) {
    const user = await authRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isEmailVerified) {
      throw new Error("Email already verified");
    }

    await otpService.sendOTP(user.email, user.firstName, "EMAIL_VERIFICATION");

    return true;
  }

  // ==========================
  // Verify Email
  // ==========================
  async verifyEmail(email, otp) {
    await otpService.verifyOTP(email, otp, "EMAIL_VERIFICATION");

    const user = await authRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    user.isEmailVerified = true;
    user.emailVerifiedAt = new Date();

    await user.save();

    return true;
  }

  // ==========================
  // Resend OTP
  // ==========================
  async resendOTP(email, purpose) {
    const user = await authRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    await otpService.sendOTP(user.email, user.firstName, purpose);

    return true;
  }

  // ==========================
  // Change Password
  // ==========================
  async changePassword(userId, oldPassword, newPassword) {
    const user = await authRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    user.password = newPassword;
    user.mustChangePassword = false;

    await user.save();

    // Logout all devices
    await refreshTokenRepository.revokeAll(user._id);

    return true;
  }
}

module.exports = new AuthService();

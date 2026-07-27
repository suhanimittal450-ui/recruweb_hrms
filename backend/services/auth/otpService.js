const OTP = require("../../models/auth/OTP");
const generateOTP = require("../../utils/generateOTP");
const emailService = require("../email/emailService");
const otpTemplate = require("../../templates/emails/otpTemplate");

class OTPService {
  async verifyOTP(email, otp, purpose) {
    const otpRecord = await OTP.findOne({
      email,
      otp,
      purpose,
      isUsed: false,
    });

    if (!otpRecord) {
      throw new Error("Invalid OTP");
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new Error("OTP has expired");
    }

    otpRecord.isUsed = true;
    await otpRecord.save();

    return true;
  }
  async validateResetOTP(email, otp) {
    const otpRecord = await OTP.findOne({
      email,
      otp,
      purpose: "FORGOT_PASSWORD",
      isUsed: false,
    });

    if (!otpRecord) {
      throw new Error("Invalid OTP");
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new Error("OTP has expired");
    }

    otpRecord.isUsed = true;
    await otpRecord.save();

    return true;
  }
  async sendOTP(email, name, purpose) {
    // Remove old OTPs
    await OTP.deleteMany({ email, purpose });

    // Generate OTP
    const otp = generateOTP();

    // Save OTP
    await OTP.create({
      email,
      otp,
      purpose,
      expiresAt: new Date(
        Date.now() + Number(process.env.OTP_EXPIRE_MINUTES) * 60 * 1000,
      ),
    });

    // Send Email
    await emailService.sendMail({
      to: email,
      subject: "Your Enterprise HRMS OTP",
      html: otpTemplate(name, otp),
    });

    return true;
  }
}

module.exports = new OTPService();

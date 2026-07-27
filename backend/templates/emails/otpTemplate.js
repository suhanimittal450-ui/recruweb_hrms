const otpTemplate = (name, otp) => {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px">
      <h2 style="color:#0d6efd">Enterprise HRMS</h2>

      <p>Hello <strong>${name}</strong>,</p>

      <p>Your One Time Password (OTP) is:</p>

      <h1 style="letter-spacing:6px;color:#198754;text-align:center">
        ${otp}
      </h1>

      <p>This OTP will expire in <strong>10 minutes</strong>.</p>

      <p>If you didn't request this OTP, please ignore this email.</p>

      <hr>

      <small>
      Enterprise HRMS Security Team
      </small>
    </div>
  `;
};

module.exports = otpTemplate;

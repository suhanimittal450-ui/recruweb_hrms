const resetPasswordTemplate = (name, link) => {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px">

      <h2 style="color:#dc3545">
        Reset Password
      </h2>

      <p>Hello <strong>${name}</strong>,</p>

      <p>
        We received a request to reset your password.
      </p>

      <a
        href="${link}"
        style="
          display:inline-block;
          padding:12px 25px;
          background:#dc3545;
          color:white;
          text-decoration:none;
          border-radius:6px;
        "
      >
        Reset Password
      </a>

      <p>
        This link will expire in 15 minutes.
      </p>

      <p>
        If you didn't request this, simply ignore this email.
      </p>

      <hr>

      <small>
      Enterprise HRMS Security Team
      </small>

    </div>
  `;
};

module.exports = resetPasswordTemplate;

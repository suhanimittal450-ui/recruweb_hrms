module.exports = (name, email, password) => {
  return `
    <h2>Welcome to Enterprise HRMS 🎉</h2>

    <p>Hello <strong>${name}</strong>,</p>

    <p>Your employee account has been created successfully.</p>

    <hr>

    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Temporary Password:</strong> ${password}</p>

    <hr>

    <p>Please login and change your password immediately.</p>

    <p>Regards,<br/>Enterprise HRMS Team</p>
  `;
};

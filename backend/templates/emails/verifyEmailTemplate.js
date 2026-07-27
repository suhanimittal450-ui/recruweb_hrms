const verifyEmailTemplate = (name, link) => {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px">

      <h2 style="color:#0d6efd">
        Verify Your Email
      </h2>

      <p>Hello <strong>${name}</strong>,</p>

      <p>
        Click the button below to verify your email address.
      </p>

      <a
        href="${link}"
        style="
          display:inline-block;
          padding:12px 25px;
          background:#0d6efd;
          color:white;
          text-decoration:none;
          border-radius:6px;
        "
      >
        Verify Email
      </a>

      <p>
        If the button doesn't work, copy this URL:
      </p>

      <p>${link}</p>

      <hr>

      <small>
      Enterprise HRMS Team
      </small>

    </div>
  `;
};

module.exports = verifyEmailTemplate;

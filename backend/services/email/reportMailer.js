const nodemailer = require("nodemailer");

class ReportMailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,

      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async send({ to, subject, text, fileName, buffer, mimeType }) {
    return this.transporter.sendMail({
      from: process.env.SMTP_EMAIL,

      to,

      subject,

      text,

      attachments: [
        {
          filename: fileName,
          content: buffer,
          contentType: mimeType,
        },
      ],
    });
  }
}

module.exports = new ReportMailer();

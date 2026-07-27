const transporter = require("../../config/mail");
const welcomeEmployee = require("../../templates/welcomeEmployee");
const payslipEmailTemplate = require("../../templates/emails/payslipEmailTemplate");

class EmailService {
  async sendMail({ to, subject, html, attachments }) {
    await transporter.sendMail({
      from: `"Enterprise HRMS" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      attachments,
    });
  }

  async sendWelcomeEmail(user, tempPassword) {
    await this.sendMail({
      to: user.email,
      subject: "Welcome to Enterprise HRMS",
      html: welcomeEmployee(
        `${user.firstName} ${user.lastName}`,
        user.email,
        tempPassword,
      ),
    });
  }

  async sendPayslipEmail({
    to,
    name,
    monthLabel,
    netSalary,
    pdfBuffer,
    fileName,
  }) {
    await this.sendMail({
      to,
      subject: `Payslip for ${monthLabel}`,
      html: payslipEmailTemplate(name, monthLabel, netSalary),
      attachments: [
        {
          filename: fileName || "payslip.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });
  }
}

module.exports = new EmailService();

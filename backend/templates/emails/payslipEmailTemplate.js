const payslipEmailTemplate = (name, monthLabel, netSalary) => {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px">
      <h2 style="color:#0d6efd">Enterprise HRMS</h2>

      <p>Hello <strong>${name}</strong>,</p>

      <p>Your payslip for <strong>${monthLabel}</strong> has been generated.</p>

      <h3 style="color:#198754">Net Salary: Rs. ${netSalary}</h3>

      <p>Please find your detailed payslip attached as a PDF to this email.</p>

      <hr>

      <small>
      Enterprise HRMS Payroll Team
      </small>
    </div>
  `;
};

module.exports = payslipEmailTemplate;

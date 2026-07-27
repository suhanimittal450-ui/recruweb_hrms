const PDFDocument = require("pdfkit");

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Builds a payslip PDF and resolves with a Buffer.
 * @param {Object} payroll - Payroll document (populated with employee -> user/department/designation)
 * @param {Object} company - Optional company info { companyName, address, logo }
 * @returns {Promise<Buffer>}
 */
const generatePayslipPDF = (payroll, company = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 40 });
      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      const employee = payroll.employee || {};
      const user = employee.user || {};
      const department = employee.department || {};
      const designation = employee.designation || {};

      const employeeName =
        `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Employee";

      const monthLabel = `${MONTH_NAMES[(payroll.month || 1) - 1] || ""} ${payroll.year || ""}`;

      // ===== Header =====
      doc
        .fontSize(18)
        .fillColor("#0d6efd")
        .text(company.companyName || "Enterprise HRMS", { align: "center" });

      doc
        .fontSize(10)
        .fillColor("#555")
        .text(company.address || "", { align: "center" });

      doc.moveDown(0.5);
      doc
        .fontSize(14)
        .fillColor("#000")
        .text(`Payslip for ${monthLabel}`, { align: "center" });

      doc.moveDown(1);
      doc.moveTo(40, doc.y).lineTo(555, doc.y).strokeColor("#dddddd").stroke();
      doc.moveDown(1);

      // ===== Employee Info =====
      const infoTop = doc.y;
      doc.fontSize(10).fillColor("#000");
      doc.text(`Employee Name: ${employeeName}`, 40, infoTop);
      doc.text(`Employee ID: ${employee.employeeId || "-"}`, 300, infoTop);

      doc.text(
        `Department: ${department.departmentName || "-"}`,
        40,
        infoTop + 18,
      );
      doc.text(
        `Designation: ${designation.designationName || "-"}`,
        300,
        infoTop + 18,
      );

      doc.text(`Payslip No: ${payroll.payslipNumber || "-"}`, 40, infoTop + 36);
      doc.text(`Status: ${payroll.status || "-"}`, 300, infoTop + 36);

      doc.moveDown(3.5);

      doc.moveTo(40, doc.y).lineTo(555, doc.y).strokeColor("#dddddd").stroke();
      doc.moveDown(1);

      // ===== Attendance Summary =====
      doc.fontSize(11).fillColor("#0d6efd").text("Attendance Summary");
      doc.moveDown(0.3);
      doc.fontSize(10).fillColor("#000");
      doc.text(
        `Working Days: ${payroll.workingDays ?? "-"}    Present: ${payroll.presentDays ?? "-"}    Leave: ${payroll.leaveDays ?? "-"}    Absent: ${payroll.absentDays ?? "-"}    OT Hours: ${payroll.overtimeHours ?? 0}`,
      );

      doc.moveDown(1);

      // ===== Earnings / Deductions Table =====
      const earnings = [
        ["Basic Salary", payroll.basicSalary],
        ["HRA", payroll.hra],
        ["DA", payroll.da],
        ["Medical Allowance", payroll.medicalAllowance],
        ["Travel Allowance", payroll.travelAllowance],
        ["Special Allowance", payroll.specialAllowance],
        ["Bonus", payroll.bonus],
        ["Incentive", payroll.incentive],
        ["Overtime Amount", payroll.overtimeAmount],
      ].filter(([, v]) => v !== undefined && v !== null);

      const deductions = [
        ["PF", payroll.pfDeduction],
        ["ESI", payroll.esiDeduction],
        ["TDS / Income Tax", payroll.tdsDeduction],
        ["Professional Tax", payroll.professionalTax],
        ["Leave Deduction", payroll.leaveDeduction],
        ["Loan Deduction", payroll.loanDeduction],
        ["Advance Deduction", payroll.advanceDeduction],
      ].filter(([, v]) => v !== undefined && v !== null);

      const colLeftX = 40;
      const colRightX = 300;
      const tableTop = doc.y;

      doc.fontSize(11).fillColor("#0d6efd");
      doc.text("Earnings", colLeftX, tableTop);
      doc.text("Deductions", colRightX, tableTop);

      let y = tableTop + 20;
      doc.fontSize(10).fillColor("#000");

      const maxRows = Math.max(earnings.length, deductions.length);
      for (let i = 0; i < maxRows; i++) {
        if (earnings[i]) {
          doc.text(earnings[i][0], colLeftX, y);
          doc.text(formatCurrency(earnings[i][1]), colLeftX + 150, y, {
            width: 60,
            align: "right",
          });
        }
        if (deductions[i]) {
          doc.text(deductions[i][0], colRightX, y);
          doc.text(formatCurrency(deductions[i][1]), colRightX + 150, y, {
            width: 60,
            align: "right",
          });
        }
        y += 18;
      }

      doc.moveDown(2);
      doc
        .moveTo(40, y + 10)
        .lineTo(555, y + 10)
        .strokeColor("#dddddd")
        .stroke();

      doc.fontSize(11).fillColor("#000");
      doc.text(
        `Gross Salary: Rs. ${formatCurrency(payroll.grossSalary)}`,
        40,
        y + 25,
      );
      doc
        .fontSize(13)
        .fillColor("#198754")
        .text(
          `Net Salary: Rs. ${formatCurrency(payroll.netSalary)}`,
          40,
          y + 45,
        );

      doc.moveDown(3);
      doc
        .fontSize(9)
        .fillColor("#888")
        .text(
          "This is a system generated payslip and does not require a signature.",
          40,
          doc.y + 20,
          { align: "center" },
        );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = generatePayslipPDF;

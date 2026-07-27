const Employee = require("../../models/employee/Employee");
const Attendance = require("../../models/attendance/Attendance");
const Payroll = require("../../models/payroll/Payroll");
const SalaryStructure = require("../../models/payroll/SalaryStructure");
const Leave = require("../../models/leave/Leave");
const payrollRepository = require("../../repositories/payroll/payrollRepository");

// =====================================
// Payroll Status Flow
// Draft(Pending) -> Processed -> Approved -> Paid -> Archived
// Rejected is a terminal branch off Processed / Approved
// =====================================
const PAYROLL_STATUS = {
  DRAFT: "Pending",
  GENERATED: "Generated",
  PROCESSED: "Processed",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  PAID: "Paid",
  ARCHIVED: "Archived",
};

class PayrollService {
  // =====================================
  // Generate Payroll
  // =====================================

  async generatePayroll(employeeId, month, year, generatedBy) {
    // -----------------------------
    // Validate Employee
    // -----------------------------
    const employee = await this.getEmployee(employeeId);

    // -----------------------------
    // Salary Structure
    // -----------------------------
    const salaryStructure = await this.getSalaryStructure(employeeId);

    // -----------------------------
    // Check Duplicate Payroll
    // -----------------------------
    const existingPayroll = await payrollRepository.findByEmployeeMonth(
      employeeId,
      month,
      year,
    );

    if (existingPayroll) {
      throw new Error("Payroll already generated.");
    }

    // -----------------------------
    // Month Range
    // -----------------------------
    const startDate = new Date(year, month - 1, 1);

    const endDate = new Date(year, month, 0);

    endDate.setHours(23, 59, 59, 999);

    // -----------------------------
    // Attendance
    // -----------------------------
    const attendances = await Attendance.find({
      employee: employeeId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    // -----------------------------
    // Approved Leaves
    // -----------------------------
    const leaves = await Leave.find({
      employee: employeeId,
      status: "Approved",
      fromDate: {
        $lte: endDate,
      },
      toDate: {
        $gte: startDate,
      },
    });

    // -----------------------------
    // Working Days
    // -----------------------------
    const totalWorkingDays = endDate.getDate();

    let presentDays = 0;
    let halfDays = 0;
    let absentDays = 0;
    let leaveDays = 0;
    let overtimeHours = 0;
    let lateDays = 0;

    // -----------------------------
    // Attendance Summary
    // -----------------------------
    attendances.forEach((attendance) => {
      switch (attendance.status) {
        case "Present":
          presentDays++;
          break;

        case "Half Day":
          halfDays++;
          break;

        case "Absent":
          absentDays++;
          break;

        default:
          break;
      }

      if (attendance.late) {
        lateDays++;
      }

      overtimeHours += attendance.overtimeHours || 0;
    });

    // -----------------------------
    // Leave Summary
    // -----------------------------
    leaves.forEach((leave) => {
      const from = new Date(leave.fromDate);

      const to = new Date(leave.toDate);

      const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

      leaveDays += days;
    });

    // -----------------------------
    // Recalculate Absent Days
    // -----------------------------
    absentDays = totalWorkingDays - presentDays - leaveDays - halfDays;

    if (absentDays < 0) {
      absentDays = 0;
    }

    // -----------------------------
    // Salary Components
    // -----------------------------
    const grossSalary =
      salaryStructure.basicSalary +
      salaryStructure.hra +
      salaryStructure.conveyance +
      salaryStructure.specialAllowance;

    // -----------------------------
    // Statutory Deductions
    // -----------------------------
    const pfDeduction = (grossSalary * salaryStructure.pfPercentage) / 100;

    const esiDeduction = (grossSalary * salaryStructure.esiPercentage) / 100;

    const tdsDeduction = (grossSalary * salaryStructure.tdsPercentage) / 100;

    // -----------------------------
    // Leave Deduction
    // -----------------------------
    const leaveDeduction = (grossSalary / totalWorkingDays) * absentDays;

    // -----------------------------
    // Overtime
    // -----------------------------
    const overtimeRate = 200;

    const overtimeAmount = overtimeHours * overtimeRate;
    // -----------------------------
    // Professional Tax
    // -----------------------------
    const professionalTax = salaryStructure.professionalTax || 0;

    // -----------------------------
    // Total Deductions
    // -----------------------------
    const totalDeductions =
      pfDeduction +
      esiDeduction +
      tdsDeduction +
      professionalTax +
      leaveDeduction;

    // -----------------------------
    // Net Salary
    // -----------------------------
    const netSalary = grossSalary + overtimeAmount - totalDeductions;

    // -----------------------------
    // Create Payroll
    // -----------------------------
    const payroll = await payrollRepository.create({
      employee: employeeId,

      month,

      year,

      generatedBy,

      workingDays: totalWorkingDays,

      presentDays,

      leaveDays,

      halfDays,

      absentDays,

      lateDays,

      overtimeHours,

      overtimeAmount,

      grossSalary,

      pfDeduction,

      esiDeduction,

      tdsDeduction,

      professionalTax,

      leaveDeduction,

      totalDeductions,

      netSalary,

      status: PAYROLL_STATUS.DRAFT,

      timeline: [
        {
          action: "Payroll Generated",
          by: generatedBy,
          date: new Date(),
        },
      ],
    });

    return payroll;
  }
  async createSalaryStructure(data) {
    const employee = await this.getEmployee(data.employee);

    const exists = await SalaryStructure.findOne({
      employee: employee._id,
    });

    if (exists) {
      throw new Error("Salary Structure already exists");
    }

    const salary = await SalaryStructure.create({
      ...data,

      timeline: [
        {
          action: "Salary Structure Created",
        },
      ],
    });

    return salary;
  }
  async updateSalaryStructure(id, data) {
    const salary = await SalaryStructure.findById(id);

    if (!salary) {
      throw new Error("Salary Structure not found");
    }

    Object.assign(salary, data);

    salary.timeline.push({
      action: "Salary Structure Updated",
    });

    await salary.save();

    return salary;
  }
  async getSalaryStructureByEmployee(employeeId) {
    return await this.getSalaryStructure(employeeId);
  }
  async getEmployee(employeeId) {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      throw new Error("Employee not found");
    }

    return employee;
  }
  async getSalaryStructure(employeeId) {
    const structure = await SalaryStructure.findOne({
      employee: employeeId,
    });

    if (!structure) {
      throw new Error("Salary Structure not found");
    }

    return structure;
  }
  async getAllPayrolls() {
    return payrollRepository.findAll();
  }

  async getPayrollById(id) {
    const payroll = await payrollRepository.findById(id);

    if (!payroll) {
      throw new Error("Payroll not found");
    }

    return payroll;
  }

  // =====================================
  // Helper: fetch raw payroll or throw
  // =====================================
  async getRawPayrollOrThrow(id) {
    const payroll = await payrollRepository.findRawById(id);

    if (!payroll) {
      throw new Error("Payroll not found");
    }

    return payroll;
  }

  // =====================================
  // PHASE 9.5.6 - PAYROLL APPROVAL WORKFLOW
  // Draft(Pending) -> Processed -> Approved -> Paid -> Archived
  // =====================================

  // -----------------------------
  // Process Payroll
  // Moves a Draft payroll into the review queue
  // -----------------------------
  async processPayroll(id, userId, remarks = "") {
    const payroll = await this.getRawPayrollOrThrow(id);

    if (
      payroll.status !== PAYROLL_STATUS.DRAFT &&
      payroll.status !== PAYROLL_STATUS.GENERATED
    ) {
      throw new Error(
        `Only draft payroll can be processed. Current status: ${payroll.status}`,
      );
    }

    return payrollRepository.updateWithTimeline(
      id,
      {
        status: PAYROLL_STATUS.PROCESSED,
        processedBy: userId,
        processedDate: new Date(),
      },
      {
        action: "Payroll Processed",
        by: userId,
        remarks,
        date: new Date(),
      },
    );
  }

  // -----------------------------
  // Approve Payroll
  // Only HR/Admin (enforced at route level)
  // Cannot approve twice
  // -----------------------------
  async approvePayroll(id, userId, remarks = "") {
    const payroll = await this.getRawPayrollOrThrow(id);

    if (payroll.status === PAYROLL_STATUS.APPROVED) {
      throw new Error("Payroll is already approved.");
    }

    if (payroll.status !== PAYROLL_STATUS.PROCESSED) {
      throw new Error(
        `Only processed payroll can be approved. Current status: ${payroll.status}`,
      );
    }

    return payrollRepository.updateWithTimeline(
      id,
      {
        status: PAYROLL_STATUS.APPROVED,
        approvedBy: userId,
        approvedDate: new Date(),
      },
      {
        action: "Payroll Approved",
        by: userId,
        remarks,
        date: new Date(),
      },
    );
  }

  // -----------------------------
  // Reject Payroll
  // Only HR/Admin (enforced at route level)
  // Cannot reject Paid (or Archived) payroll
  // -----------------------------
  async rejectPayroll(id, userId, reason = "") {
    const payroll = await this.getRawPayrollOrThrow(id);

    if (payroll.status === PAYROLL_STATUS.PAID) {
      throw new Error("Cannot reject a payroll that has already been paid.");
    }

    if (payroll.status === PAYROLL_STATUS.ARCHIVED) {
      throw new Error("Cannot reject an archived payroll.");
    }

    if (!reason || !reason.trim()) {
      throw new Error("Rejection reason is required.");
    }

    return payrollRepository.updateWithTimeline(
      id,
      {
        status: PAYROLL_STATUS.REJECTED,
        rejectedBy: userId,
        rejectedDate: new Date(),
        rejectionReason: reason,
      },
      {
        action: "Payroll Rejected",
        by: userId,
        remarks: reason,
        date: new Date(),
      },
    );
  }

  // -----------------------------
  // Mark Payroll Paid
  // Only Approved payroll can be marked Paid
  // -----------------------------
  async markAsPaid(id, userId, remarks = "") {
    const payroll = await this.getRawPayrollOrThrow(id);

    if (payroll.status !== PAYROLL_STATUS.APPROVED) {
      throw new Error(
        `Only approved payroll can be marked as paid. Current status: ${payroll.status}`,
      );
    }

    return payrollRepository.updateWithTimeline(
      id,
      {
        status: PAYROLL_STATUS.PAID,
        paidBy: userId,
        paidDate: new Date(),
      },
      {
        action: "Payroll Marked Paid",
        by: userId,
        remarks,
        date: new Date(),
      },
    );
  }

  // -----------------------------
  // Archive Payroll
  // Only Paid payroll can be archived
  // -----------------------------
  async archivePayroll(id, userId, remarks = "") {
    const payroll = await this.getRawPayrollOrThrow(id);

    if (payroll.status !== PAYROLL_STATUS.PAID) {
      throw new Error(
        `Only paid payroll can be archived. Current status: ${payroll.status}`,
      );
    }

    return payrollRepository.updateWithTimeline(
      id,
      {
        status: PAYROLL_STATUS.ARCHIVED,
        archivedBy: userId,
        archivedDate: new Date(),
      },
      {
        action: "Payroll Archived",
        by: userId,
        remarks,
        date: new Date(),
      },
    );
  }

  // -----------------------------
  // Get Payroll Timeline
  // -----------------------------
  async getPayrollTimeline(id) {
    const payroll = await this.getPayrollById(id);

    return payroll.timeline;
  }
}

module.exports = new PayrollService();

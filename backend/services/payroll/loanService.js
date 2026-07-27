const loanRepository = require("../../repositories/payroll/loanRepository");
const employeeRepository = require("../../repositories/employee/employeeRepository");
const generateSequentialNumber = require("../../utils/generateSequentialNumber");

class LoanService {
  async requestLoan(userId, data) {
    const employee = await employeeRepository.findOne({ user: userId });

    if (!employee) {
      throw new Error("Employee not found");
    }

    return this.createLoanForEmployee(employee._id, data, userId);
  }

  async createLoanForEmployee(employeeId, data, requestedBy) {
    const employee = await employeeRepository.findById(employeeId);

    if (!employee) {
      throw new Error("Employee not found");
    }

    const amount = Number(data.amount);
    const tenureMonths = Number(data.tenureMonths);

    if (!amount || amount <= 0) {
      throw new Error("Loan amount must be greater than zero");
    }

    if (!tenureMonths || tenureMonths <= 0) {
      throw new Error("Tenure months must be greater than zero");
    }

    const monthlyInstallment = Math.round((amount / tenureMonths) * 100) / 100;

    const count = await loanRepository.countDocuments();

    const loan = await loanRepository.create({
      loanNumber: generateSequentialNumber("LOAN", count),
      employee: employeeId,
      amount,
      reason: data.reason,
      tenureMonths,
      monthlyInstallment,
      remainingAmount: amount,
      requestedBy,
    });

    return loan;
  }

  async getAll(query = {}) {
    const filter = {};

    if (query.status) filter.status = query.status;
    if (query.employee) filter.employee = query.employee;

    return loanRepository.findAll(filter);
  }

  async getById(id) {
    const loan = await loanRepository.findById(id);

    if (!loan) {
      throw new Error("Loan not found");
    }

    return loan;
  }

  async getMyLoans(userId) {
    const employee = await employeeRepository.findOne({ user: userId });

    if (!employee) {
      throw new Error("Employee not found");
    }

    return loanRepository.findByEmployee(employee._id);
  }

  async approveLoan(id, approverId, body = {}) {
    const loan = await loanRepository.findById(id);

    if (!loan) {
      throw new Error("Loan not found");
    }

    if (loan.status !== "Pending") {
      throw new Error(`Loan is already ${loan.status}`);
    }

    const now = new Date();

    return loanRepository.update(id, {
      status: "Active",
      approvedBy: approverId,
      approvedAt: now,
      disbursedAmount: loan.amount,
      startMonth: body.startMonth || now.getMonth() + 1,
      startYear: body.startYear || now.getFullYear(),
    });
  }

  async rejectLoan(id, approverId, reason) {
    const loan = await loanRepository.findById(id);

    if (!loan) {
      throw new Error("Loan not found");
    }

    if (loan.status !== "Pending") {
      throw new Error(`Loan is already ${loan.status}`);
    }

    return loanRepository.update(id, {
      status: "Rejected",
      approvedBy: approverId,
      approvedAt: new Date(),
      rejectionReason: reason,
    });
  }

  async delete(id) {
    const loan = await loanRepository.findById(id);

    if (!loan) {
      throw new Error("Loan not found");
    }

    if (loan.status === "Active" && loan.paidAmount > 0) {
      throw new Error("Cannot delete a loan with active repayments");
    }

    await loanRepository.delete(id);
    return true;
  }

  // Called by payroll generation to compute this month's installment
  async getActiveLoansForEmployee(employeeId) {
    return loanRepository.findActiveByEmployee(employeeId);
  }

  // Called when payroll is marked Paid, to record repayment
  async recordRepayment(loanId, amountPaid) {
    const loan = await loanRepository.findById(loanId);

    if (!loan) return null;

    const paidAmount = (loan.paidAmount || 0) + amountPaid;
    const remainingAmount = Math.max(loan.amount - paidAmount, 0);

    return loanRepository.update(loanId, {
      paidAmount,
      remainingAmount,
      status: remainingAmount <= 0 ? "Closed" : "Active",
    });
  }
}

module.exports = new LoanService();

const advanceSalaryRepository = require("../../repositories/payroll/advanceSalaryRepository");
const employeeRepository = require("../../repositories/employee/employeeRepository");
const generateSequentialNumber = require("../../utils/generateSequentialNumber");

class AdvanceSalaryService {
  async requestAdvance(userId, data) {
    const employee = await employeeRepository.findOne({ user: userId });

    if (!employee) {
      throw new Error("Employee not found");
    }

    return this.createAdvanceForEmployee(employee._id, data, userId);
  }

  async createAdvanceForEmployee(employeeId, data, requestedBy) {
    const employee = await employeeRepository.findById(employeeId);

    if (!employee) {
      throw new Error("Employee not found");
    }

    const amount = Number(data.amount);
    const deductionMonths = Number(data.deductionMonths) || 1;

    if (!amount || amount <= 0) {
      throw new Error("Advance amount must be greater than zero");
    }

    if (!data.month || !data.year) {
      throw new Error("Month and year are required");
    }

    const monthlyDeduction = Math.round((amount / deductionMonths) * 100) / 100;

    const count = await advanceSalaryRepository.countDocuments();

    return advanceSalaryRepository.create({
      advanceNumber: generateSequentialNumber("ADV", count),
      employee: employeeId,
      amount,
      reason: data.reason,
      month: Number(data.month),
      year: Number(data.year),
      deductionMonths,
      monthlyDeduction,
      remainingAmount: amount,
      requestedBy,
    });
  }

  async getAll(query = {}) {
    const filter = {};

    if (query.status) filter.status = query.status;
    if (query.employee) filter.employee = query.employee;

    return advanceSalaryRepository.findAll(filter);
  }

  async getById(id) {
    const advance = await advanceSalaryRepository.findById(id);

    if (!advance) {
      throw new Error("Advance Salary request not found");
    }

    return advance;
  }

  async getMyAdvances(userId) {
    const employee = await employeeRepository.findOne({ user: userId });

    if (!employee) {
      throw new Error("Employee not found");
    }

    return advanceSalaryRepository.findByEmployee(employee._id);
  }

  async approveAdvance(id, approverId) {
    const advance = await advanceSalaryRepository.findById(id);

    if (!advance) {
      throw new Error("Advance Salary request not found");
    }

    if (advance.status !== "Pending") {
      throw new Error(`Advance request is already ${advance.status}`);
    }

    return advanceSalaryRepository.update(id, {
      status: "Active",
      approvedBy: approverId,
      approvedAt: new Date(),
    });
  }

  async rejectAdvance(id, approverId, reason) {
    const advance = await advanceSalaryRepository.findById(id);

    if (!advance) {
      throw new Error("Advance Salary request not found");
    }

    if (advance.status !== "Pending") {
      throw new Error(`Advance request is already ${advance.status}`);
    }

    return advanceSalaryRepository.update(id, {
      status: "Rejected",
      approvedBy: approverId,
      approvedAt: new Date(),
      rejectionReason: reason,
    });
  }

  async delete(id) {
    const advance = await advanceSalaryRepository.findById(id);

    if (!advance) {
      throw new Error("Advance Salary request not found");
    }

    if (advance.status === "Active" && advance.paidAmount > 0) {
      throw new Error("Cannot delete an advance with active deductions");
    }

    await advanceSalaryRepository.delete(id);
    return true;
  }

  async getActiveAdvancesForEmployee(employeeId) {
    return advanceSalaryRepository.findActiveByEmployee(employeeId);
  }

  async recordDeduction(advanceId, amountDeducted) {
    const advance = await advanceSalaryRepository.findById(advanceId);

    if (!advance) return null;

    const paidAmount = (advance.paidAmount || 0) + amountDeducted;
    const remainingAmount = Math.max(advance.amount - paidAmount, 0);

    return advanceSalaryRepository.update(advanceId, {
      paidAmount,
      remainingAmount,
      status: remainingAmount <= 0 ? "Closed" : "Active",
    });
  }
}

module.exports = new AdvanceSalaryService();

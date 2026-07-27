const Loan = require("../../models/payroll/Loan");

class LoanRepository {
  async create(data) {
    return Loan.create(data);
  }

  async findAll(filter = {}) {
    return Loan.find(filter)
      .populate({ path: "employee", populate: ["department", "designation"] })
      .populate("approvedBy", "firstName lastName email")
      .sort({ createdAt: -1 });
  }

  async findById(id) {
    return Loan.findById(id)
      .populate("employee")
      .populate("approvedBy", "firstName lastName email");
  }

  async findByEmployee(employeeId) {
    return Loan.find({ employee: employeeId }).sort({ createdAt: -1 });
  }

  async findActiveByEmployee(employeeId) {
    return Loan.find({
      employee: employeeId,
      status: "Active",
      remainingAmount: { $gt: 0 },
    });
  }

  async update(id, data) {
    return Loan.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async delete(id) {
    return Loan.findByIdAndDelete(id);
  }

  async countDocuments() {
    return Loan.countDocuments();
  }
}

module.exports = new LoanRepository();

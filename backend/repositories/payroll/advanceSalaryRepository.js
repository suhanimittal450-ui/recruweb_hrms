const AdvanceSalary = require("../../models/payroll/AdvanceSalary");

class AdvanceSalaryRepository {
  async create(data) {
    return AdvanceSalary.create(data);
  }

  async findAll(filter = {}) {
    return AdvanceSalary.find(filter)
      .populate({ path: "employee", populate: ["department", "designation"] })
      .populate("approvedBy", "firstName lastName email")
      .sort({ createdAt: -1 });
  }

  async findById(id) {
    return AdvanceSalary.findById(id)
      .populate("employee")
      .populate("approvedBy", "firstName lastName email");
  }

  async findByEmployee(employeeId) {
    return AdvanceSalary.find({ employee: employeeId }).sort({ createdAt: -1 });
  }

  async findActiveByEmployee(employeeId) {
    return AdvanceSalary.find({
      employee: employeeId,
      status: "Active",
      remainingAmount: { $gt: 0 },
    });
  }

  async update(id, data) {
    return AdvanceSalary.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async delete(id) {
    return AdvanceSalary.findByIdAndDelete(id);
  }

  async countDocuments() {
    return AdvanceSalary.countDocuments();
  }
}

module.exports = new AdvanceSalaryRepository();

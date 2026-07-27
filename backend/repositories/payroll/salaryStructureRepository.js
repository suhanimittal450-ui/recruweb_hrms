const SalaryStructure = require("../../models/payroll/SalaryStructure");

class SalaryStructureRepository {
  async create(data) {
    return SalaryStructure.create(data);
  }

  async findAll(filter = {}) {
    return SalaryStructure.find(filter)
      .populate({
        path: "employee",
        populate: ["department", "designation", "branch"],
      })
      .sort({ createdAt: -1 });
  }

  async findById(id) {
    return SalaryStructure.findById(id).populate("employee");
  }

  async findByEmployee(employeeId) {
    return SalaryStructure.findOne({ employee: employeeId });
  }

  async update(id, data) {
    return SalaryStructure.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async upsertByEmployee(employeeId, data) {
    return SalaryStructure.findOneAndUpdate(
      { employee: employeeId },
      { $set: data },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );
  }

  async delete(id) {
    return SalaryStructure.findByIdAndDelete(id);
  }
}

module.exports = new SalaryStructureRepository();

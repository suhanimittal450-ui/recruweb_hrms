const salaryStructureRepository = require("../../repositories/payroll/salaryStructureRepository");
const employeeRepository = require("../../repositories/employee/employeeRepository");

class SalaryStructureService {
  async createOrUpdate(employeeId, data) {
    const employee = await employeeRepository.findById(employeeId);

    if (!employee) {
      throw new Error("Employee not found");
    }

    return salaryStructureRepository.upsertByEmployee(employeeId, {
      ...data,
      employee: employeeId,
    });
  }

  async getAll(query = {}) {
    const filter = {};

    if (query.isActive !== undefined) {
      filter.isActive = query.isActive === "true" || query.isActive === true;
    }

    return salaryStructureRepository.findAll(filter);
  }

  async getById(id) {
    const structure = await salaryStructureRepository.findById(id);

    if (!structure) {
      throw new Error("Salary Structure not found");
    }

    return structure;
  }

  async getByEmployee(employeeId) {
    const structure =
      await salaryStructureRepository.findByEmployee(employeeId);

    if (!structure) {
      throw new Error("Salary Structure not found for this employee");
    }

    return structure;
  }

  async update(id, data) {
    const structure = await salaryStructureRepository.update(id, data);

    if (!structure) {
      throw new Error("Salary Structure not found");
    }

    return structure;
  }

  async delete(id) {
    const structure = await salaryStructureRepository.delete(id);

    if (!structure) {
      throw new Error("Salary Structure not found");
    }

    return true;
  }
}

module.exports = new SalaryStructureService();

const Department = require("../../models/organization/Department");

class DepartmentRepository {
  async create(data) {
    return Department.create(data);
  }

  async findAll(filter = {}) {
    return Department.find(filter).sort({ departmentName: 1 });
  }

  async findById(id) {
    return Department.findById(id);
  }

  async findByCode(departmentCode) {
    return Department.findOne({
      departmentCode: departmentCode?.toUpperCase(),
    });
  }

  async update(id, data) {
    return Department.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async delete(id) {
    return Department.findByIdAndDelete(id);
  }
}

module.exports = new DepartmentRepository();

const Designation = require("../../models/master/Designation");

class DesignationRepository {
  async create(data) {
    return Designation.create(data);
  }

  async findAll(filter = {}) {
    return Designation.find(filter)
      .populate("department", "departmentName departmentCode")
      .sort({ level: 1, designationName: 1 });
  }

  async findById(id) {
    return Designation.findById(id).populate(
      "department",
      "departmentName departmentCode",
    );
  }

  async findByCode(designationCode) {
    return Designation.findOne({
      designationCode: designationCode?.toUpperCase(),
    });
  }

  async findByDepartment(departmentId) {
    return Designation.find({ department: departmentId }).sort({ level: 1 });
  }

  async update(id, data) {
    return Designation.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async delete(id) {
    return Designation.findByIdAndDelete(id);
  }
}

module.exports = new DesignationRepository();

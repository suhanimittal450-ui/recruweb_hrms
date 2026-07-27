const Employee = require("../../models/employee/Employee");

class EmployeeRepository {
  async create(data) {
    return await Employee.create(data);
  }

  async findAll(filter = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "createdAt",
      order = "desc",
    } = options;

    const skip = (page - 1) * limit;

    if (search) {
      filter.$or = [{ employeeId: { $regex: search, $options: "i" } }];
    }

    const sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    const employees = await Employee.find(filter)
      .populate("user")
      .populate("candidate")
      .populate("company")
      .populate("branch")
      .populate("department")
      .populate("designation")
      .populate("reportingManager")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Employee.countDocuments(filter);

    return {
      employees,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findById(id) {
    return await Employee.findById(id)
      .populate("user")
      .populate("candidate")
      .populate("company")
      .populate("branch")
      .populate("department")
      .populate("designation")
      .populate("reportingManager");
  }

  async update(id, data) {
    return await Employee.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }
  async findOne(filter) {
    return await Employee.findOne(filter);
  }

  async countDocuments() {
    return await Employee.countDocuments();
  }
  async findLatestEmployee() {
    return await Employee.findOne().sort("-createdAt");
  }
  async delete(id) {
    return await Employee.findByIdAndDelete(id);
  }
}

module.exports = new EmployeeRepository();

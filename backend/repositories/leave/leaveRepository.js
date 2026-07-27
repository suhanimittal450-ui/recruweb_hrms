const Leave = require("../../models/leave/Leave");

class LeaveRepository {
  // Create Leave
  async create(data) {
    return await Leave.create(data);
  }

  // Get Leave by ID
  async findById(id) {
    return await Leave.findById(id)
      .populate("employee")
      .populate("leaveType")
      .populate("approvedBy");
  }

  // Get All Leaves
  async findAll(filter = {}) {
    return await Leave.find(filter)
      .populate("employee")
      .populate("leaveType")
      .populate("approvedBy")
      .sort({ createdAt: -1 });
  }

  // Get Leaves by Employee
  async findByEmployee(employeeId) {
    return await Leave.find({ employee: employeeId })
      .populate("employee")
      .populate("leaveType")
      .populate("approvedBy")
      .sort({ createdAt: -1 });
  }

  // Get Leaves by Status
  async findByStatus(status) {
    return await Leave.find({ status })
      .populate("employee")
      .populate("leaveType")
      .populate("approvedBy")
      .sort({ createdAt: -1 });
  }

  // Update Leave
  async update(id, data) {
    return await Leave.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    })
      .populate("employee")
      .populate("leaveType")
      .populate("approvedBy");
  }

  // Delete Leave
  async delete(id) {
    return await Leave.findByIdAndDelete(id);
  }
}

module.exports = new LeaveRepository();

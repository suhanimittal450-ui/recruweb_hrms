const Employee = require("../../models/employee/Employee");
const LeaveBalance = require("../../models/leave/LeaveBalance");
const Attendance = require("../../models/attendance/Attendance");
const leaveRepository = require("../../repositories/leave/leaveRepository");
const Leave = require("../../models/leave/Leave");

class LeaveService {
  // Get Employee
  async getEmployee(userId) {
    const employee = await Employee.findOne({ user: userId });

    if (!employee) {
      throw new Error("Employee not found");
    }

    return employee;
  }

  // Apply Leave
  async applyLeave(userId, data) {
    const employee = await this.getEmployee(userId);

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (endDate < startDate) {
      throw new Error("End date cannot be before start date.");
    }

    const totalDays =
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    // Check overlapping leave
    const existingLeaves = await leaveRepository.findAll({
      employee: employee._id,
      status: { $in: ["Pending", "Approved"] },
    });

    const overlap = existingLeaves.find(
      (leave) => startDate <= leave.endDate && endDate >= leave.startDate,
    );

    if (overlap) {
      throw new Error("A leave already exists for the selected dates.");
    }

    // Check Leave Balance
    const year = startDate.getFullYear();

    const leaveBalance = await LeaveBalance.findOne({
      employee: employee._id,
      leaveType: data.leaveType,
      year,
    });

    if (!leaveBalance) {
      throw new Error("Leave balance not found.");
    }

    if (leaveBalance.remaining < totalDays) {
      throw new Error(`Only ${leaveBalance.remaining} leave(s) remaining.`);
    }

    return await leaveRepository.create({
      employee: employee._id,
      leaveType: data.leaveType,
      startDate,
      endDate,
      totalDays,
      reason: data.reason,
    });
  }

  // My Leaves
  async myLeaves(userId) {
    const employee = await this.getEmployee(userId);

    return await leaveRepository.findByEmployee(employee._id);
  }

  // Approve Leave
  async approveLeave(leaveId, approvedBy) {
    const leave = await Leave.findById(leaveId);

    if (!leave) {
      throw new Error("Leave not found");
    }

    if (leave.status !== "Pending") {
      throw new Error("Leave already processed");
    }

    let balance = await LeaveBalance.findOne({
      employee: leave.employee,
      leaveType: leave.leaveType,
    });

    if (!balance) {
      throw new Error("Leave balance not found");
    }

    if (balance.remaining < leave.totalDays) {
      throw new Error("Insufficient leave balance");
    }

    balance.used += leave.totalDays;
    balance.remaining -= leave.totalDays;

    await balance.save();

    leave.status = "Approved";
    leave.approvedBy = approvedBy;
    leave.approvedAt = new Date();

    await leave.save();

    return leave;
  }

  // Reject Leave
  async rejectLeave(leaveId, approvedBy, reason) {
    const leave = await Leave.findById(leaveId);

    if (!leave) {
      throw new Error("Leave not found");
    }

    if (leave.status !== "Pending") {
      throw new Error("Leave already processed");
    }

    leave.status = "Rejected";

    leave.approvedBy = approvedBy;

    leave.rejectionReason = reason;

    leave.approvedAt = new Date();

    await leave.save();

    return leave;
  }

  // Cancel Leave
  async cancelLeave(id, userId) {
    const employee = await this.getEmployee(userId);

    const leave = await leaveRepository.findById(id);

    if (!leave) {
      throw new Error("Leave not found.");
    }

    if (leave.employee._id.toString() !== employee._id.toString()) {
      throw new Error("Unauthorized.");
    }

    if (leave.status === "Approved") {
      const year = new Date(leave.startDate).getFullYear();

      const leaveBalance = await LeaveBalance.findOne({
        employee: employee._id,
        leaveType: leave.leaveType._id,
        year,
      });

      if (leaveBalance) {
        leaveBalance.used -= leave.totalDays;

        if (leaveBalance.used < 0) {
          leaveBalance.used = 0;
        }

        leaveBalance.remaining = leaveBalance.allocated - leaveBalance.used;

        await leaveBalance.save();
      }
    }

    return await leaveRepository.update(id, {
      status: "Cancelled",
    });
  }

  // Get All Leaves
  async getAllLeaves() {
    return await leaveRepository.findAll();
  }
  async employeeDashboard(userId) {
    const employee = await Employee.findOne({
      user: userId,
    });

    const leaves = await Leave.find({
      employee: employee._id,
    }).populate("leaveType");

    const balances = await LeaveBalance.find({
      employee: employee._id,
    }).populate("leaveType");

    return {
      balances,
      leaves,
    };
  }
  async hrDashboard() {
    const totalLeaves = await Leave.countDocuments();

    const pendingLeaves = await Leave.countDocuments({
      status: "Pending",
    });

    const approvedLeaves = await Leave.countDocuments({
      status: "Approved",
    });

    const rejectedLeaves = await Leave.countDocuments({
      status: "Rejected",
    });

    return {
      totalLeaves,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,
    };
  }
  // Get Employee Leave Balance
  async getLeaveBalance(userId) {
    const employee = await this.getEmployee(userId);

    return await LeaveBalance.find({
      employee: employee._id,
    })
      .populate("leaveType")
      .sort({ year: -1 });
  }
}

module.exports = new LeaveService();

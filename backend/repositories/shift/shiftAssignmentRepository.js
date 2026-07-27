const ShiftAssignment = require("../../models/shift/ShiftAssignment");

class ShiftAssignmentRepository {
  async create(data) {
    return ShiftAssignment.create(data);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20 } = options;

    const skip = (page - 1) * limit;

    const assignments = await ShiftAssignment.find(filter)
      .populate("employee", "employeeId user")
      .populate("shift")
      .populate("assignedBy", "firstName lastName email")
      .sort({ effectiveFrom: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ShiftAssignment.countDocuments(filter);

    return {
      assignments,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findById(id) {
    return ShiftAssignment.findById(id)
      .populate("employee", "employeeId user")
      .populate("shift")
      .populate("assignedBy", "firstName lastName email");
  }

  async findRawById(id) {
    return ShiftAssignment.findById(id);
  }

  // -----------------------------
  // All assignments for an employee, most recent first
  // -----------------------------
  async findByEmployee(employeeId) {
    return ShiftAssignment.find({ employee: employeeId })
      .populate("shift")
      .populate("assignedBy", "firstName lastName email")
      .sort({ effectiveFrom: -1 });
  }

  // -----------------------------
  // The Active assignment covering a specific date, if any
  // -----------------------------
  async findActiveByEmployeeOnDate(employeeId, date) {
    return ShiftAssignment.findOne({
      employee: employeeId,
      status: "Active",
      effectiveFrom: { $lte: date },
      $or: [{ effectiveTo: null }, { effectiveTo: { $gte: date } }],
    }).populate("shift");
  }

  // -----------------------------
  // Any assignment(s) for an employee that overlap a date range
  // Used for overlap prevention
  // -----------------------------
  async findOverlapping(
    employeeId,
    effectiveFrom,
    effectiveTo,
    excludeId = null,
  ) {
    const filter = {
      employee: employeeId,
      status: "Active",
      effectiveFrom: effectiveTo ? { $lte: effectiveTo } : { $exists: true },
      $or: [{ effectiveTo: null }, { effectiveTo: { $gte: effectiveFrom } }],
    };

    if (excludeId) {
      filter._id = { $ne: excludeId };
    }

    return ShiftAssignment.find(filter);
  }

  // -----------------------------
  // Roster: all Active assignments for a shift covering a date
  // -----------------------------
  async findRosterByShift(shiftId, date) {
    return ShiftAssignment.find({
      shift: shiftId,
      status: "Active",
      effectiveFrom: { $lte: date },
      $or: [{ effectiveTo: null }, { effectiveTo: { $gte: date } }],
    }).populate("employee", "employeeId user");
  }

  async update(id, data) {
    return ShiftAssignment.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    })
      .populate("employee", "employeeId user")
      .populate("shift");
  }

  async updateWithTimeline(id, updateFields, timelineEntry) {
    return ShiftAssignment.findByIdAndUpdate(
      id,
      {
        $set: updateFields,
        $push: { timeline: timelineEntry },
      },
      { returnDocument: "after", runValidators: true },
    )
      .populate("employee", "employeeId user")
      .populate("shift")
      .populate("assignedBy", "firstName lastName email");
  }

  async delete(id) {
    return ShiftAssignment.findByIdAndDelete(id);
  }
}

module.exports = new ShiftAssignmentRepository();

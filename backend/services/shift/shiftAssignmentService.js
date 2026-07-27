const Employee = require("../../models/employee/Employee");
const Shift = require("../../models/shift/Shift");

const shiftAssignmentRepository = require("../../repositories/shift/shiftAssignmentRepository");

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

class ShiftAssignmentService {
  async getEmployeeOrThrow(employeeId) {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      throw new Error("Employee not found.");
    }

    return employee;
  }

  async getShiftOrThrow(shiftId) {
    const shift = await Shift.findById(shiftId);

    if (!shift) {
      throw new Error("Shift not found.");
    }

    return shift;
  }

  // =====================================
  // Assign Shift
  // Creates a new assignment segment. If the employee already has an
  // open-ended (ongoing) active assignment that starts on or before the
  // new one, it is automatically closed out the day before the new
  // assignment begins (this is what makes reassignment / rotation smooth).
  // A genuine overlap between two finite-dated assignments is rejected.
  // =====================================
  async assignShift(data, assignedBy) {
    const {
      employee,
      shift,
      effectiveFrom,
      effectiveTo = null,
      weeklyOffDays,
      isRotational = false,
      rotationCycleDays = null,
      rotationGroup = null,
      remarks = "",
    } = data;

    await this.getEmployeeOrThrow(employee);
    await this.getShiftOrThrow(shift);

    const from = new Date(effectiveFrom);
    const to = effectiveTo ? new Date(effectiveTo) : null;

    if (to && to < from) {
      throw new Error("effectiveTo cannot be before effectiveFrom.");
    }

    const overlapping = await shiftAssignmentRepository.findOverlapping(
      employee,
      from,
      to,
    );

    for (const existing of overlapping) {
      const isOpenEnded = !existing.effectiveTo;
      const startsBeforeOrOnNew = existing.effectiveFrom <= from;

      if (isOpenEnded && startsBeforeOrOnNew) {
        // Auto-close the previous ongoing assignment
        const closeDate = new Date(from);
        closeDate.setDate(closeDate.getDate() - 1);

        const newEffectiveTo =
          closeDate >= existing.effectiveFrom
            ? closeDate
            : existing.effectiveFrom;

        await shiftAssignmentRepository.updateWithTimeline(
          existing._id,
          { status: "Ended", effectiveTo: newEffectiveTo },
          {
            action: "Auto-ended (superseded by new shift assignment)",
            by: assignedBy,
            date: new Date(),
          },
        );
      } else {
        throw new Error(
          "This employee already has an overlapping shift assignment for the given date range.",
        );
      }
    }

    const assignment = await shiftAssignmentRepository.create({
      employee,
      shift,
      effectiveFrom: from,
      effectiveTo: to,
      weeklyOffDays,
      isRotational,
      rotationCycleDays,
      rotationGroup,
      assignedBy,
      status: "Active",
      remarks,
      timeline: [
        {
          action: "Shift Assigned",
          by: assignedBy,
          remarks,
          date: new Date(),
        },
      ],
    });

    // Keep Employee.shift in sync if this assignment is currently effective
    const today = new Date();

    if (from <= today && (!to || to >= today)) {
      await Employee.findByIdAndUpdate(employee, { shift });
    }

    return shiftAssignmentRepository.findById(assignment._id);
  }

  // =====================================
  // Rotational Shift
  // Creates a sequence of assignment segments that together form one
  // rotation schedule for an employee (e.g. Week 1 Morning, Week 2 Night).
  // =====================================
  async createRotationSchedule(employeeId, segments, assignedBy) {
    if (!Array.isArray(segments) || segments.length < 2) {
      throw new Error(
        "A rotation schedule requires at least two shift segments.",
      );
    }

    await this.getEmployeeOrThrow(employeeId);

    const rotationGroup = `ROT-${employeeId}-${Date.now()}`;

    const sorted = [...segments].sort(
      (a, b) => new Date(a.effectiveFrom) - new Date(b.effectiveFrom),
    );

    const created = [];

    for (const segment of sorted) {
      const assignment = await this.assignShift(
        {
          employee: employeeId,
          shift: segment.shift,
          effectiveFrom: segment.effectiveFrom,
          effectiveTo: segment.effectiveTo || null,
          weeklyOffDays: segment.weeklyOffDays,
          isRotational: true,
          rotationCycleDays: segment.rotationCycleDays || null,
          rotationGroup,
          remarks: segment.remarks || "Part of rotation schedule",
        },
        assignedBy,
      );

      created.push(assignment);
    }

    return created;
  }

  // =====================================
  // Get All Assignments (paginated, filterable)
  // =====================================
  async getAllAssignments(filter = {}, options = {}) {
    return shiftAssignmentRepository.findAll(filter, options);
  }

  async getAssignmentById(id) {
    const assignment = await shiftAssignmentRepository.findById(id);

    if (!assignment) {
      throw new Error("Shift assignment not found.");
    }

    return assignment;
  }

  async getAssignmentsByEmployee(employeeId) {
    await this.getEmployeeOrThrow(employeeId);

    return shiftAssignmentRepository.findByEmployee(employeeId);
  }

  // =====================================
  // Current Shift Lookup
  // =====================================
  async getCurrentShift(employeeId, date = new Date()) {
    await this.getEmployeeOrThrow(employeeId);

    const assignment =
      await shiftAssignmentRepository.findActiveByEmployeeOnDate(
        employeeId,
        date,
      );

    if (!assignment) {
      throw new Error("No active shift assignment found for this date.");
    }

    return assignment;
  }

  // =====================================
  // Weekly Off Check
  // =====================================
  async isWeeklyOff(employeeId, date = new Date()) {
    const checkDate = new Date(date);

    const assignment =
      await shiftAssignmentRepository.findActiveByEmployeeOnDate(
        employeeId,
        checkDate,
      );

    if (!assignment) {
      return false;
    }

    const dayName = DAY_NAMES[checkDate.getDay()];

    return assignment.weeklyOffDays.includes(dayName);
  }

  // =====================================
  // Shift Roster (who is on a given shift on a given date)
  // =====================================
  async getRoster(shiftId, date = new Date()) {
    await this.getShiftOrThrow(shiftId);

    return shiftAssignmentRepository.findRosterByShift(shiftId, date);
  }

  // =====================================
  // Update Assignment (weekly off / remarks / dates)
  // =====================================
  async updateAssignment(id, data, userId) {
    const assignment = await shiftAssignmentRepository.findRawById(id);

    if (!assignment) {
      throw new Error("Shift assignment not found.");
    }

    return shiftAssignmentRepository.updateWithTimeline(id, data, {
      action: "Shift Assignment Updated",
      by: userId,
      date: new Date(),
    });
  }

  // =====================================
  // End Assignment
  // =====================================
  async endAssignment(id, userId, effectiveTo = new Date(), remarks = "") {
    const assignment = await shiftAssignmentRepository.findRawById(id);

    if (!assignment) {
      throw new Error("Shift assignment not found.");
    }

    if (assignment.status === "Ended") {
      throw new Error("This shift assignment has already ended.");
    }

    return shiftAssignmentRepository.updateWithTimeline(
      id,
      { status: "Ended", effectiveTo: new Date(effectiveTo) },
      {
        action: "Shift Assignment Ended",
        by: userId,
        remarks,
        date: new Date(),
      },
    );
  }

  async deleteAssignment(id) {
    const assignment = await shiftAssignmentRepository.findRawById(id);

    if (!assignment) {
      throw new Error("Shift assignment not found.");
    }

    return shiftAssignmentRepository.delete(id);
  }
}

module.exports = new ShiftAssignmentService();

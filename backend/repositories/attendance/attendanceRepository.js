const Attendance = require("../../models/attendance/Attendance");

class AttendanceRepository {
  // ==========================================
  // CREATE
  // ==========================================
  async create(data) {
    return Attendance.create(data);
  }

  // ==========================================
  // FIND BY ID
  // ==========================================
  async findById(id) {
    return Attendance.findById(id).populate("employee");
  }

  // ==========================================
  // UPDATE
  // ==========================================
  async update(id, data) {
    return Attendance.findByIdAndUpdate(id, data, {
returnDocument: "after",      runValidators: true,
    }).populate("employee");
  }

  // ==========================================
  // DELETE
  // ==========================================
  async delete(id) {
    return Attendance.findByIdAndDelete(id);
  }

  // ==========================================
  // TODAY ATTENDANCE
  // ==========================================
  async findTodayAttendance(employeeId, date) {
    return Attendance.findOne({
      employee: employeeId,
      date,
    }).populate("employee");
  }

  // ==========================================
  // EMPLOYEE ATTENDANCE
  // ==========================================
  async findByEmployee(employeeId) {
    return Attendance.find({
      employee: employeeId,
    })
      .populate("employee")
      .sort({ date: -1 });
  }

  // ==========================================
  // MONTHLY REPORT
  // ==========================================
  async findByEmployeeMonth(employeeId, startDate, endDate) {
    return Attendance.find({
      employee: employeeId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ date: 1 });
  }

  // ==========================================
  // EMPLOYEE STATS
  // ==========================================
  async getEmployeeStats(employeeId) {
    return Attendance.find({
      employee: employeeId,
    });
  }

  // ==========================================
  // TODAY RECORDS
  // ==========================================
  async getTodayAttendance() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Attendance.find({
      date: today,
    }).populate("employee");
  }

  // ==========================================
  // LATE EMPLOYEES
  // ==========================================
  async getLateEmployees() {
    return Attendance.find({
      late: true,
    })
      .populate("employee")
      .sort({ date: -1 });
  }

  // ==========================================
  // ABSENT EMPLOYEES
  // ==========================================
  async getAbsentEmployees() {
    return Attendance.find({
      status: "Absent",
    })
      .populate("employee")
      .sort({ date: -1 });
  }

  // ==========================================
  // TEAM SUMMARY
  // ==========================================
  async getTeamSummary() {
    return Attendance.find().populate("employee").sort({ date: -1 });
  }

  // ==========================================
  // CALENDAR
  // ==========================================
  async getAttendanceCalendar(employeeId) {
    return Attendance.find({
      employee: employeeId,
    })
      .select("date status late halfDay clockIn clockOut")
      .sort({ date: 1 });
  }

  // ==========================================
  // COUNT BY STATUS
  // ==========================================
  async countByStatus(status) {
    return Attendance.countDocuments({
      status,
    });
  }

  // ==========================================
  // TOTAL RECORDS
  // ==========================================
  async countAll() {
    return Attendance.countDocuments();
  }

  // ==========================================
  // ALL RECORDS
  // ==========================================
  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sortBy = "date", order = "desc" } = options;

    const skip = (page - 1) * limit;

    const sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    const attendances = await Attendance.find(filter)
      .populate("employee")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Attendance.countDocuments(filter);

    return {
      attendances,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }
}

module.exports = new AttendanceRepository();

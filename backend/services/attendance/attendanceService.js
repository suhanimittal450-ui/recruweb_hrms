const attendanceRepository = require("../../repositories/attendance/attendanceRepository");
const Employee = require("../../models/employee/Employee");

class AttendanceService {
  async getEmployee(userId) {
    const employee = await Employee.findOne({
      user: userId,
    });

    if (!employee) {
      throw new Error("Employee not found");
    }

    return employee;
  }
  // ==========================
  // CLOCK IN
  // ==========================
  async clockIn(userId, data = {}) {
    const employee = await this.getEmployee(userId);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await attendanceRepository.findTodayAttendance(
      employee._id,
      today,
    );

    if (existing) {
      throw new Error("You have already clocked in today.");
    }

    const now = new Date();

    const officeTime = new Date(today);
    officeTime.setHours(9, 30, 0, 0);

    const late = now > officeTime;

    return attendanceRepository.create({
      employee: employee._id,

      date: today,

      clockIn: now,

      status: "Present",

      late,

      location: data.location || "",

      device: data.device || "",

      notes: data.notes || "",

      breaks: [],

      totalBreakMinutes: 0,

      workingMinutes: 0,

      netWorkingMinutes: 0,

      workingHours: 0,

      netWorkingHours: 0,

      overtimeHours: 0,

      halfDay: false,
    });
  }

  async breakIn(userId) {
    const employee = await this.getEmployee(userId);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await attendanceRepository.findTodayAttendance(
      employee._id,
      today,
    );

    if (!attendance) {
      throw new Error("Please clock in first");
    }

    if (attendance.clockOut) {
      throw new Error("Already clocked out");
    }

    const active = attendance.breaks.find((b) => b.breakIn && !b.breakOut);

    if (active) {
      throw new Error("Break already started");
    }

    attendance.breaks.push({
      breakIn: new Date(),
    });

    await attendance.save();

    return attendance;
  }
  async breakOut(userId) {
    const employee = await this.getEmployee(userId);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await attendanceRepository.findTodayAttendance(
      employee._id,
      today,
    );

    if (!attendance) {
      throw new Error("Attendance not found");
    }

    const active = attendance.breaks.find((b) => b.breakIn && !b.breakOut);

    if (!active) {
      throw new Error("No active break found");
    }

    active.breakOut = new Date();

    active.durationMinutes = Math.floor(
      (active.breakOut - active.breakIn) / (1000 * 60),
    );

    attendance.totalBreakMinutes = attendance.breaks.reduce(
      (sum, item) => sum + (item.durationMinutes || 0),
      0,
    );

    await attendance.save();

    return attendance;
  }
  async clockOut(userId) {
    const employee = await this.getEmployee(userId);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await attendanceRepository.findTodayAttendance(
      employee._id,
      today,
    );

    if (!attendance) {
      throw new Error("Clock In not found");
    }

    if (attendance.clockOut) {
      throw new Error("Already Clocked Out");
    }

    const now = new Date();

    const workingMinutes = Math.floor((now - attendance.clockIn) / (1000 * 60));

    const breakMinutes = attendance.totalBreakMinutes || 0;

    const netWorkingMinutes = workingMinutes - breakMinutes;

    const workingHours = Number((workingMinutes / 60).toFixed(2));

    const netWorkingHours = Number((netWorkingMinutes / 60).toFixed(2));

    const overtimeHours =
      netWorkingHours > 8 ? Number((netWorkingHours - 8).toFixed(2)) : 0;

    const halfDay = netWorkingHours < 4;

    const status = halfDay ? "Half Day" : "Present";

    return attendanceRepository.update(attendance._id, {
      clockOut: now,

      workingMinutes,

      netWorkingMinutes,

      workingHours,

      netWorkingHours,

      overtimeHours,

      totalBreakMinutes: breakMinutes,

      halfDay,

      status,
    });
  }

  // ==========================
  // MY ATTENDANCE
  // ==========================
  async myAttendance(userId) {
    const employee = await this.getEmployee(userId);

    return await attendanceRepository.findByEmployee(employee._id);
  }

  // ==========================
  // MONTHLY REPORT
  // ==========================
  async monthlyReport(userId, month, year) {
    const employee = await this.getEmployee(userId);

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    endDate.setHours(23, 59, 59, 999);

    const records = await attendanceRepository.findByEmployeeMonth(
      employee._id,
      startDate,
      endDate,
    );

    const report = {
      totalDays: records.length,
      present: 0,
      halfDay: 0,
      absent: 0,
      late: 0,
      totalWorkingHours: 0,
      totalNetWorkingHours: 0,
      totalBreakMinutes: 0,
      overtimeHours: 0,
      records,
    };

    records.forEach((item) => {
      if (item.status === "Present") report.present++;
      if (item.status === "Half Day") report.halfDay++;
      if (item.status === "Absent") report.absent++;

      if (item.late) report.late++;

      report.totalWorkingHours += item.workingHours || 0;
      report.totalNetWorkingHours += item.netWorkingHours || 0;
      report.totalBreakMinutes += item.totalBreakMinutes || 0;
      report.overtimeHours += item.overtimeHours || 0;
    });

    return report;
  }

  // ==========================
  // EMPLOYEE DASHBOARD
  // ==========================

  async employeeDashboard(userId) {
    const employee = await this.getEmployee(userId);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await attendanceRepository.findTodayAttendance(
      employee._id,
      today,
    );

    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const report = await this.monthlyReport(userId, currentMonth, currentYear);

    return {
      todayAttendance: attendance,
      monthlyReport: report,
    };
  }

  // ==========================
  // HR DASHBOARD
  // ==========================

  async hrDashboard() {
    const presentToday = await attendanceRepository.countByStatus("Present");
    const halfDay = await attendanceRepository.countByStatus("Half Day");
    const absent = await attendanceRepository.countByStatus("Absent");
    const totalAttendance = await attendanceRepository.countAll();

    return {
      totalAttendance,
      presentToday,
      halfDay,
      absent,
    };
  }
  async lateReport() {
    return await attendanceRepository.getLateEmployees();
  }
  async analytics() {
    const records = await attendanceRepository.findAll();

    const totalRecords = records.attendances.length;

    const present = records.attendances.filter(
      (r) => r.status === "Present",
    ).length;

    const halfDay = records.attendances.filter(
      (r) => r.status === "Half Day",
    ).length;

    return {
      totalRecords,
      present,
      halfDay,
    };
  }
  // Attendance Calendar
  async attendanceCalendar(userId) {
    const employee = await this.getEmployee(userId);

    return await attendanceRepository.getAttendanceCalendar(employee._id);
  }

  // Team Summary
  async teamSummary() {
    return await attendanceRepository.getTeamSummary();
  }

  // Absent Report
  async absentReport() {
    return await attendanceRepository.getAbsentEmployees();
  }
}
module.exports = new AttendanceService();

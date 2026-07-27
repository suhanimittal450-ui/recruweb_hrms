const asyncHandler = require("../../middlewares/asyncHandler");
const attendanceService = require("../../services/attendance/attendanceService");

// ===============================
// Clock In
// ===============================
exports.clockIn = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.clockIn(req.user._id, req.body);

  res.status(201).json({
    success: true,
    message: "Clock In Successful",
    data: attendance,
  });
});

// ===============================
// Break In
// ===============================
exports.breakIn = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.breakIn(req.user._id);

  res.status(200).json({
    success: true,
    message: "Break Started",
    data: attendance,
  });
});

// ===============================
// Break Out
// ===============================
exports.breakOut = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.breakOut(req.user._id);

  res.status(200).json({
    success: true,
    message: "Break Ended",
    data: attendance,
  });
});

// ===============================
// Clock Out
// ===============================
exports.clockOut = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.clockOut(req.user._id);

  res.status(200).json({
    success: true,
    message: "Clock Out Successful",
    data: attendance,
  });
});

// ===============================
// My Attendance
// ===============================
exports.myAttendance = asyncHandler(async (req, res) => {
  const data = await attendanceService.myAttendance(req.user._id);

  res.status(200).json({
    success: true,
    data,
  });
});

// ===============================
// Monthly Report
// ===============================
exports.monthlyReport = asyncHandler(async (req, res) => {
  const data = await attendanceService.monthlyReport(
    req.user._id,
    req.query.month,
    req.query.year,
  );

  res.status(200).json({
    success: true,
    data,
  });
});

// ===============================
// Employee Dashboard
// ===============================
exports.employeeDashboard = asyncHandler(async (req, res) => {
  const data = await attendanceService.employeeDashboard(req.user._id);

  res.status(200).json({
    success: true,
    data,
  });
});
exports.lateReport = asyncHandler(async (req, res) => {
  const data = await attendanceService.lateReport();

  res.status(200).json({
    success: true,
    data,
  });
});
exports.attendanceAnalytics = asyncHandler(async (req, res) => {
  const data = await attendanceService.analytics();

  res.status(200).json({
    success: true,
    data,
  });
});
// Attendance Calendar
exports.attendanceCalendar = asyncHandler(async (req, res) => {
  const data = await attendanceService.attendanceCalendar(req.user._id);

  res.status(200).json({
    success: true,
    data,
  });
});

// Team Summary
exports.teamSummary = asyncHandler(async (req, res) => {
  const data = await attendanceService.teamSummary();

  res.status(200).json({
    success: true,
    data,
  });
});

// Absent Report
exports.absentReport = asyncHandler(async (req, res) => {
  const data = await attendanceService.absentReport();

  res.status(200).json({
    success: true,
    data,
  });
});
// ===============================
// HR Dashboard
// ===============================
exports.hrDashboard = asyncHandler(async (req, res) => {
  const data = await attendanceService.hrDashboard();

  res.status(200).json({
    success: true,
    data,
  });
});

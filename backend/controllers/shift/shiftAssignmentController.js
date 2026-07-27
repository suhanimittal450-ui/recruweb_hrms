const asyncHandler = require("../../middlewares/asyncHandler");
const shiftAssignmentService = require("../../services/shift/shiftAssignmentService");

// -----------------------------
// Create Shift Assignment
// -----------------------------
exports.createAssignment = asyncHandler(async (req, res) => {
  const data = await shiftAssignmentService.assignShift(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Shift assigned successfully",
    data,
  });
});

// -----------------------------
// Create Rotation Schedule
// -----------------------------
exports.createRotationSchedule = asyncHandler(async (req, res) => {
  const data = await shiftAssignmentService.createRotationSchedule(
    req.body.employee,
    req.body.segments,
    req.user._id,
  );

  res.status(201).json({
    success: true,
    message: "Rotation schedule created successfully",
    data,
  });
});

// -----------------------------
// Get All Assignments
// -----------------------------
exports.getAllAssignments = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.employee) filter.employee = req.query.employee;
  if (req.query.shift) filter.shift = req.query.shift;
  if (req.query.status) filter.status = req.query.status;

  const options = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 20,
  };

  const data = await shiftAssignmentService.getAllAssignments(filter, options);

  res.json({ success: true, ...data });
});

// -----------------------------
// Get Assignment By Id
// -----------------------------
exports.getAssignmentById = asyncHandler(async (req, res) => {
  const data = await shiftAssignmentService.getAssignmentById(req.params.id);

  res.json({ success: true, data });
});

// -----------------------------
// Get Assignments For An Employee
// -----------------------------
exports.getAssignmentsByEmployee = asyncHandler(async (req, res) => {
  const data = await shiftAssignmentService.getAssignmentsByEmployee(
    req.params.employeeId,
  );

  res.json({ success: true, data });
});

// -----------------------------
// Get Employee's Current Shift
// -----------------------------
exports.getCurrentShift = asyncHandler(async (req, res) => {
  const date = req.query.date ? new Date(req.query.date) : new Date();

  const data = await shiftAssignmentService.getCurrentShift(
    req.params.employeeId,
    date,
  );

  res.json({ success: true, data });
});

// -----------------------------
// Check Weekly Off For A Date
// -----------------------------
exports.checkWeeklyOff = asyncHandler(async (req, res) => {
  const date = req.query.date ? new Date(req.query.date) : new Date();

  const isWeeklyOff = await shiftAssignmentService.isWeeklyOff(
    req.params.employeeId,
    date,
  );

  res.json({ success: true, data: { isWeeklyOff, date } });
});

// -----------------------------
// Shift Roster
// -----------------------------
exports.getRoster = asyncHandler(async (req, res) => {
  const date = req.query.date ? new Date(req.query.date) : new Date();

  const data = await shiftAssignmentService.getRoster(req.query.shiftId, date);

  res.json({ success: true, data });
});

// -----------------------------
// Update Assignment
// -----------------------------
exports.updateAssignment = asyncHandler(async (req, res) => {
  const data = await shiftAssignmentService.updateAssignment(
    req.params.id,
    req.body,
    req.user._id,
  );

  res.json({
    success: true,
    message: "Shift assignment updated successfully",
    data,
  });
});

// -----------------------------
// End Assignment
// -----------------------------
exports.endAssignment = asyncHandler(async (req, res) => {
  const data = await shiftAssignmentService.endAssignment(
    req.params.id,
    req.user._id,
    req.body.effectiveTo,
    req.body.remarks,
  );

  res.json({
    success: true,
    message: "Shift assignment ended successfully",
    data,
  });
});

// -----------------------------
// Delete Assignment
// -----------------------------
exports.deleteAssignment = asyncHandler(async (req, res) => {
  await shiftAssignmentService.deleteAssignment(req.params.id);

  res.json({ success: true, message: "Shift assignment deleted" });
});

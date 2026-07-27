const asyncHandler = require("../../middlewares/asyncHandler");
const leaveService = require("../../services/leave/leaveService");

// Apply Leave
exports.applyLeave = asyncHandler(async (req, res) => {
  const leave = await leaveService.applyLeave(req.user._id, req.body);

  res.status(201).json({
    success: true,
    message: "Leave applied successfully.",
    data: leave,
  });
});

// Get Logged-in Employee Leaves
exports.myLeaves = asyncHandler(async (req, res) => {
  const leaves = await leaveService.myLeaves(req.user._id);

  res.status(200).json({
    success: true,
    count: leaves.length,
    data: leaves,
  });
});

// Get All Leaves (Admin / HR)
exports.getAllLeaves = asyncHandler(async (req, res) => {
  const leaves = await leaveService.getAllLeaves();

  res.status(200).json({
    success: true,
    count: leaves.length,
    data: leaves,
  });
});

// Approve Leave
exports.approveLeave = asyncHandler(async (req, res) => {
  const leave = await leaveService.approveLeave(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    message: "Leave approved successfully.",
    data: leave,
  });
});

// Reject Leave
exports.rejectLeave = asyncHandler(async (req, res) => {
  const { rejectionReason = "" } = req.body;

  const leave = await leaveService.rejectLeave(
    req.params.id,
    req.user._id,
    rejectionReason,
  );

  res.status(200).json({
    success: true,
    message: "Leave rejected successfully.",
    data: leave,
  });
});

// Cancel Leave
exports.cancelLeave = asyncHandler(async (req, res) => {
  const leave = await leaveService.cancelLeave(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    message: "Leave cancelled successfully.",
    data: leave,
  });
});

// Get Leave Balance
exports.leaveBalance = asyncHandler(async (req, res) => {
  const balance = await leaveService.getLeaveBalance(req.user._id);

  res.status(200).json({
    success: true,
    count: balance.length,
    data: balance,
  });
});
exports.approveLeave = asyncHandler(async (req, res) => {
  const data = await leaveService.approveLeave(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    message: "Leave Approved",
    data,
  });
});
exports.rejectLeave = asyncHandler(async (req, res) => {
  const data = await leaveService.rejectLeave(
    req.params.id,
    req.user._id,
    req.body.reason,
  );

  res.status(200).json({
    success: true,
    message: "Leave Rejected",
    data,
  });
});
exports.employeeDashboard = asyncHandler(async (req, res) => {
  const data = await leaveService.employeeDashboard(req.user._id);

  res.status(200).json({
    success: true,
    data,
  });
});
exports.hrDashboard = asyncHandler(async (req, res) => {
  const data = await leaveService.hrDashboard();

  res.status(200).json({
    success: true,
    data,
  });
});

// Health Check
exports.test = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Leave Module Working Successfully 🚀",
  });
});

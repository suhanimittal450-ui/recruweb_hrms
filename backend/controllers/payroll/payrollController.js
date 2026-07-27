const asyncHandler = require("../../middlewares/asyncHandler");

const payrollService = require("../../services/payroll/payrollService");

exports.generatePayroll = asyncHandler(async (req, res) => {
  const payroll = await payrollService.generatePayroll(
    req.body.employeeId,
    req.body.month,
    req.body.year,
  );

  res.status(201).json({
    success: true,
    message: "Payroll Generated",
    data: payroll,
  });
});

exports.getAllPayrolls = asyncHandler(async (req, res) => {
  const data = await payrollService.getAllPayrolls();

  res.json({
    success: true,
    data,
  });
});

exports.getPayrollById = asyncHandler(async (req, res) => {
  const data = await payrollService.getPayrollById(req.params.id);

  res.json({
    success: true,
    data,
  });
});

// =====================================
// PHASE 9.5.6 - PAYROLL APPROVAL WORKFLOW
// =====================================

// -----------------------------
// Process Payroll
// -----------------------------
exports.processPayroll = asyncHandler(async (req, res) => {
  const data = await payrollService.processPayroll(
    req.params.id,
    req.user._id,
    req.body.remarks,
  );

  res.status(200).json({
    success: true,
    message: "Payroll Processed",
    data,
  });
});

// -----------------------------
// Approve Payroll
// -----------------------------
exports.approvePayroll = asyncHandler(async (req, res) => {
  const data = await payrollService.approvePayroll(
    req.params.id,
    req.user._id,
    req.body.remarks,
  );

  res.status(200).json({
    success: true,
    message: "Payroll Approved",
    data,
  });
});

// -----------------------------
// Reject Payroll
// -----------------------------
exports.rejectPayroll = asyncHandler(async (req, res) => {
  const data = await payrollService.rejectPayroll(
    req.params.id,
    req.user._id,
    req.body.reason,
  );

  res.status(200).json({
    success: true,
    message: "Payroll Rejected",
    data,
  });
});

// -----------------------------
// Mark Payroll Paid
// -----------------------------
exports.markAsPaid = asyncHandler(async (req, res) => {
  const data = await payrollService.markAsPaid(
    req.params.id,
    req.user._id,
    req.body.remarks,
  );

  res.json({
    success: true,
    message: "Salary Marked Paid",
    data,
  });
});

// -----------------------------
// Archive Payroll
// -----------------------------
exports.archivePayroll = asyncHandler(async (req, res) => {
  const data = await payrollService.archivePayroll(
    req.params.id,
    req.user._id,
    req.body.remarks,
  );

  res.status(200).json({
    success: true,
    message: "Payroll Archived",
    data,
  });
});

// -----------------------------
// Get Payroll Timeline
// -----------------------------
exports.getPayrollTimeline = asyncHandler(async (req, res) => {
  const data = await payrollService.getPayrollTimeline(req.params.id);

  res.json({
    success: true,
    data,
  });
});

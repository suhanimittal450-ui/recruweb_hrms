const asyncHandler = require("../../middlewares/asyncHandler");
const employeeService = require("../../services/employee/employeeService");

// Create Employee
exports.createEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.createEmployee(req.body);

  res.status(201).json({
    success: true,
    message: "Employee created successfully",
    data: employee,
  });
});

// Get All Employees
exports.getAllEmployees = asyncHandler(async (req, res) => {
  const result = await employeeService.getAllEmployees(req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

// Get Employee By ID
exports.getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);

  res.status(200).json({
    success: true,
    data: employee,
  });
});

// Get the logged-in user's own employee profile
exports.getMyEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.getMyEmployeeRecord(req.user._id);

  res.status(200).json({
    success: true,
    data: employee,
  });
});

// Update Employee
exports.updateEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.updateEmployee(
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Employee updated successfully",
    data: employee,
  });
});

// Delete Employee
exports.deleteEmployee = asyncHandler(async (req, res) => {
  await employeeService.deleteEmployee(req.params.id);

  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
});

// ------------------------------------------------------------------
// Documents
// ------------------------------------------------------------------

// Upload a document (multipart/form-data: field "file", body field "type")
exports.uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  if (!req.body.type) {
    return res.status(400).json({ success: false, message: "Document type is required" });
  }

  const fileUrl = `/uploads/documents/${req.file.filename}`;
  const employee = await employeeService.addDocument(req.params.id, {
    type: req.body.type,
    fileUrl,
    originalName: req.file.originalname,
  });

  res.status(201).json({
    success: true,
    message: "Document uploaded",
    data: employee.documents,
  });
});

exports.listDocuments = asyncHandler(async (req, res) => {
  const documents = await employeeService.listDocuments(req.params.id);
  res.status(200).json({ success: true, data: documents });
});

// Flat pending-documents queue across all employees (for HR/Admin review)
exports.listPendingDocuments = asyncHandler(async (req, res) => {
  const pending = await employeeService.listPendingDocuments();
  res.status(200).json({ success: true, data: pending });
});

exports.verifyDocument = asyncHandler(async (req, res) => {
  const { status, remarks } = req.body;
  if (!["Verified", "Rejected"].includes(status)) {
    return res.status(400).json({ success: false, message: "Status must be Verified or Rejected" });
  }

  const employee = await employeeService.verifyDocument(req.params.id, req.params.documentId, {
    status,
    remarks,
    verifiedBy: req.user?._id,
  });

  res.status(200).json({
    success: true,
    message: `Document ${status.toLowerCase()}`,
    data: employee.documents,
  });
});

// ------------------------------------------------------------------
// Onboarding
// ------------------------------------------------------------------

exports.listOnboarding = asyncHandler(async (req, res) => {
  const onboarding = await employeeService.listOnboarding(req.params.id);
  res.status(200).json({ success: true, data: onboarding });
});

exports.toggleOnboardingStep = asyncHandler(async (req, res) => {
  const onboarding = await employeeService.toggleOnboardingStep(
    req.params.id,
    req.params.stepId,
    Boolean(req.body.completed),
  );
  res.status(200).json({ success: true, data: onboarding });
});

const asyncHandler = require("../../middlewares/asyncHandler");
const organizationService = require("../../services/organization/organizationService");

// =====================================
// COMPANY
// =====================================
exports.createCompany = asyncHandler(async (req, res) => {
  const data = await organizationService.createCompany(req.body);

  res.status(201).json({
    success: true,
    message: "Company created successfully",
    data,
  });
});

exports.getAllCompanies = asyncHandler(async (req, res) => {
  const data = await organizationService.getAllCompanies();

  res.json({ success: true, data });
});

exports.getCompanyById = asyncHandler(async (req, res) => {
  const data = await organizationService.getCompanyById(req.params.id);

  res.json({ success: true, data });
});

exports.updateCompany = asyncHandler(async (req, res) => {
  const data = await organizationService.updateCompany(req.params.id, req.body);

  res.json({ success: true, message: "Company updated successfully", data });
});

exports.deleteCompany = asyncHandler(async (req, res) => {
  await organizationService.deleteCompany(req.params.id);

  res.json({ success: true, message: "Company deleted successfully" });
});

// =====================================
// BRANCH
// =====================================
exports.createBranch = asyncHandler(async (req, res) => {
  const data = await organizationService.createBranch(req.body);

  res.status(201).json({
    success: true,
    message: "Branch created successfully",
    data,
  });
});

exports.getAllBranches = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.company) {
    filter.company = req.query.company;
  }

  const data = await organizationService.getAllBranches(filter);

  res.json({ success: true, data });
});

exports.getBranchById = asyncHandler(async (req, res) => {
  const data = await organizationService.getBranchById(req.params.id);

  res.json({ success: true, data });
});

exports.updateBranch = asyncHandler(async (req, res) => {
  const data = await organizationService.updateBranch(req.params.id, req.body);

  res.json({ success: true, message: "Branch updated successfully", data });
});

exports.deleteBranch = asyncHandler(async (req, res) => {
  await organizationService.deleteBranch(req.params.id);

  res.json({ success: true, message: "Branch deleted successfully" });
});

// =====================================
// DEPARTMENT
// =====================================
exports.createDepartment = asyncHandler(async (req, res) => {
  const data = await organizationService.createDepartment(req.body);

  res.status(201).json({
    success: true,
    message: "Department created successfully",
    data,
  });
});

exports.getAllDepartments = asyncHandler(async (req, res) => {
  const data = await organizationService.getAllDepartments();

  res.json({ success: true, data });
});

exports.getDepartmentById = asyncHandler(async (req, res) => {
  const data = await organizationService.getDepartmentById(req.params.id);

  res.json({ success: true, data });
});

exports.updateDepartment = asyncHandler(async (req, res) => {
  const data = await organizationService.updateDepartment(
    req.params.id,
    req.body,
  );

  res.json({
    success: true,
    message: "Department updated successfully",
    data,
  });
});

exports.deleteDepartment = asyncHandler(async (req, res) => {
  await organizationService.deleteDepartment(req.params.id);

  res.json({ success: true, message: "Department deleted successfully" });
});

// =====================================
// DESIGNATION
// =====================================
exports.createDesignation = asyncHandler(async (req, res) => {
  const data = await organizationService.createDesignation(req.body);

  res.status(201).json({
    success: true,
    message: "Designation created successfully",
    data,
  });
});

exports.getAllDesignations = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.department) {
    filter.department = req.query.department;
  }

  const data = await organizationService.getAllDesignations(filter);

  res.json({ success: true, data });
});

exports.getDesignationById = asyncHandler(async (req, res) => {
  const data = await organizationService.getDesignationById(req.params.id);

  res.json({ success: true, data });
});

exports.updateDesignation = asyncHandler(async (req, res) => {
  const data = await organizationService.updateDesignation(
    req.params.id,
    req.body,
  );

  res.json({
    success: true,
    message: "Designation updated successfully",
    data,
  });
});

exports.deleteDesignation = asyncHandler(async (req, res) => {
  await organizationService.deleteDesignation(req.params.id);

  res.json({ success: true, message: "Designation deleted successfully" });
});

// =====================================
// REPORTING HIERARCHY
// =====================================
exports.getReportingChain = asyncHandler(async (req, res) => {
  const data = await organizationService.getReportingChain(
    req.params.employeeId,
  );

  res.json({ success: true, data });
});

exports.getDirectReports = asyncHandler(async (req, res) => {
  const data = await organizationService.getDirectReports(
    req.params.employeeId,
  );

  res.json({ success: true, data });
});

exports.assignReportingManager = asyncHandler(async (req, res) => {
  const data = await organizationService.assignReportingManager(
    req.params.employeeId,
    req.body.managerId,
  );

  res.json({
    success: true,
    message: "Reporting manager updated successfully",
    data,
  });
});

// =====================================
// ORGANIZATION TREE
// =====================================
exports.getOrganizationTree = asyncHandler(async (req, res) => {
  const data = await organizationService.getOrganizationTree(
    req.query.rootEmployeeId || null,
  );

  res.json({ success: true, data });
});

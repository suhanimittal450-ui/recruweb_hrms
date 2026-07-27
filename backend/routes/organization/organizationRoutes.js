const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");

const organizationController = require("../../controllers/organization/organizationController");
const organizationValidator = require("../../validators/organizationValidator");

// =====================================
// COMPANY
// =====================================
router.post(
  "/companies",
  authMiddleware,
  authorize("ADMIN"),
  organizationValidator.createCompanyValidator,
  validate,
  organizationController.createCompany,
);

router.get(
  "/companies",
  authMiddleware,
  organizationController.getAllCompanies,
);

router.get(
  "/companies/:id",
  authMiddleware,
  organizationController.getCompanyById,
);

router.put(
  "/companies/:id",
  authMiddleware,
  authorize("ADMIN"),
  organizationValidator.updateCompanyValidator,
  validate,
  organizationController.updateCompany,
);

router.delete(
  "/companies/:id",
  authMiddleware,
  authorize("ADMIN"),
  organizationController.deleteCompany,
);

// =====================================
// BRANCH
// =====================================
router.post(
  "/branches",
  authMiddleware,
  authorize("ADMIN", "HR"),
  organizationValidator.createBranchValidator,
  validate,
  organizationController.createBranch,
);

router.get("/branches", authMiddleware, organizationController.getAllBranches);

router.get(
  "/branches/:id",
  authMiddleware,
  organizationController.getBranchById,
);

router.put(
  "/branches/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  organizationValidator.updateBranchValidator,
  validate,
  organizationController.updateBranch,
);

router.delete(
  "/branches/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  organizationController.deleteBranch,
);

// =====================================
// DEPARTMENT
// =====================================
router.post(
  "/departments",
  authMiddleware,
  authorize("ADMIN", "HR"),
  organizationValidator.createDepartmentValidator,
  validate,
  organizationController.createDepartment,
);

router.get(
  "/departments",
  authMiddleware,
  organizationController.getAllDepartments,
);

router.get(
  "/departments/:id",
  authMiddleware,
  organizationController.getDepartmentById,
);

router.put(
  "/departments/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  organizationValidator.updateDepartmentValidator,
  validate,
  organizationController.updateDepartment,
);

router.delete(
  "/departments/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  organizationController.deleteDepartment,
);

// =====================================
// DESIGNATION
// =====================================
router.post(
  "/designations",
  authMiddleware,
  authorize("ADMIN", "HR"),
  organizationValidator.createDesignationValidator,
  validate,
  organizationController.createDesignation,
);

router.get(
  "/designations",
  authMiddleware,
  organizationController.getAllDesignations,
);

router.get(
  "/designations/:id",
  authMiddleware,
  organizationController.getDesignationById,
);

router.put(
  "/designations/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  organizationValidator.updateDesignationValidator,
  validate,
  organizationController.updateDesignation,
);

router.delete(
  "/designations/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  organizationController.deleteDesignation,
);

// =====================================
// REPORTING HIERARCHY
// =====================================
router.get(
  "/hierarchy/:employeeId/chain",
  authMiddleware,
  organizationValidator.employeeIdParamValidator,
  validate,
  organizationController.getReportingChain,
);

router.get(
  "/hierarchy/:employeeId/reports",
  authMiddleware,
  organizationValidator.employeeIdParamValidator,
  validate,
  organizationController.getDirectReports,
);

router.put(
  "/hierarchy/:employeeId/manager",
  authMiddleware,
  authorize("ADMIN", "HR"),
  organizationValidator.assignManagerValidator,
  validate,
  organizationController.assignReportingManager,
);

// =====================================
// ORGANIZATION TREE
// =====================================
router.get("/tree", authMiddleware, organizationController.getOrganizationTree);

module.exports = router;

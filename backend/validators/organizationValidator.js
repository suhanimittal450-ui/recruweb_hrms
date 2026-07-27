const { body, param } = require("express-validator");

// =====================================
// COMPANY
// =====================================
const createCompanyValidator = [
  body("companyName").trim().notEmpty().withMessage("Company name is required"),
  body("companyCode").trim().notEmpty().withMessage("Company code is required"),
  body("email").optional().isEmail().withMessage("Valid email required"),
];

const updateCompanyValidator = [
  param("id").isMongoId().withMessage("Valid company id is required"),
  body("companyName").optional().trim().notEmpty(),
  body("companyCode").optional().trim().notEmpty(),
  body("email").optional().isEmail().withMessage("Valid email required"),
];

// =====================================
// BRANCH
// =====================================
const createBranchValidator = [
  body("branchName").trim().notEmpty().withMessage("Branch name is required"),
  body("branchCode").trim().notEmpty().withMessage("Branch code is required"),
  body("company").isMongoId().withMessage("Valid company id is required"),
];

const updateBranchValidator = [
  param("id").isMongoId().withMessage("Valid branch id is required"),
  body("company")
    .optional()
    .isMongoId()
    .withMessage("Valid company id required"),
];

// =====================================
// DEPARTMENT
// =====================================
const createDepartmentValidator = [
  body("departmentName")
    .trim()
    .notEmpty()
    .withMessage("Department name is required"),
  body("departmentCode")
    .trim()
    .notEmpty()
    .withMessage("Department code is required"),
];

const updateDepartmentValidator = [
  param("id").isMongoId().withMessage("Valid department id is required"),
];

// =====================================
// DESIGNATION
// =====================================
const createDesignationValidator = [
  body("designationName")
    .trim()
    .notEmpty()
    .withMessage("Designation name is required"),
  body("designationCode")
    .trim()
    .notEmpty()
    .withMessage("Designation code is required"),
  body("department").isMongoId().withMessage("Valid department id is required"),
];

const updateDesignationValidator = [
  param("id").isMongoId().withMessage("Valid designation id is required"),
  body("department")
    .optional()
    .isMongoId()
    .withMessage("Valid department id required"),
];

// =====================================
// REPORTING HIERARCHY
// =====================================
const employeeIdParamValidator = [
  param("employeeId").isMongoId().withMessage("Valid employee id is required"),
];

const assignManagerValidator = [
  ...employeeIdParamValidator,
  body("managerId")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Valid manager id is required"),
];

module.exports = {
  createCompanyValidator,
  updateCompanyValidator,
  createBranchValidator,
  updateBranchValidator,
  createDepartmentValidator,
  updateDepartmentValidator,
  createDesignationValidator,
  updateDesignationValidator,
  employeeIdParamValidator,
  assignManagerValidator,
};

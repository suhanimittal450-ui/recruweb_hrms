const { body, param } = require("express-validator");

// -----------------------------
// Generic Payroll Id Param Validator
// -----------------------------
const payrollIdValidator = [
  param("id").isMongoId().withMessage("Valid Payroll Id is required"),
];

// -----------------------------
// Process / Approve / Pay / Archive Validator
// remarks is optional free text
// -----------------------------
const remarksValidator = [
  ...payrollIdValidator,

  body("remarks")
    .optional()
    .isString()
    .withMessage("Remarks must be a string")
    .isLength({ max: 500 })
    .withMessage("Remarks cannot exceed 500 characters"),
];

// -----------------------------
// Reject Payroll Validator
// reason is required
// -----------------------------
const rejectPayrollValidator = [
  ...payrollIdValidator,

  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Rejection reason is required")
    .isLength({ max: 500 })
    .withMessage("Reason cannot exceed 500 characters"),
];

module.exports = {
  payrollIdValidator,
  remarksValidator,
  rejectPayrollValidator,
};

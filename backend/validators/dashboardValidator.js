const { query, param } = require("express-validator");

// ==========================================
// Dashboard Filters
// ==========================================

const dashboardValidator = [
  query("from").optional().isISO8601().withMessage("Invalid from date"),

  query("to").optional().isISO8601().withMessage("Invalid to date"),

  query("department")
    .optional()
    .isMongoId()
    .withMessage("Invalid department id"),

  query("employee").optional().isMongoId().withMessage("Invalid employee id"),

  query("month")
    .optional()
    .isInt({ min: 1, max: 12 })
    .withMessage("Month must be between 1 and 12"),

  query("year")
    .optional()
    .isInt({ min: 2020, max: 2100 })
    .withMessage("Invalid year"),

  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Invalid limit"),

  query("chart")
    .optional()
    .isIn(["line", "bar", "pie", "area", "radar"])
    .withMessage("Invalid chart type"),
];

// ==========================================
// Department Analytics
// ==========================================

const departmentValidator = [
  param("departmentId").isMongoId().withMessage("Invalid Department Id"),
];

// ==========================================
// Employee Analytics
// ==========================================

const employeeValidator = [
  param("employeeId").isMongoId().withMessage("Invalid Employee Id"),
];

module.exports = {
  dashboardValidator,
  departmentValidator,
  employeeValidator,
};

const { query } = require("express-validator");

// ============================================
// Global Search Validation
// ============================================

const globalSearchValidator = [
  query("q")
    .trim()
    .notEmpty()
    .withMessage("Search query is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Search query must be between 2 and 100 characters."),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),

  query("sort")
    .optional()
    .isIn([
      "createdAt",
      "-createdAt",
      "name",
      "-name",
      "updatedAt",
      "-updatedAt",
    ])
    .withMessage("Invalid sort field."),

  query("type")
    .optional()
    .isIn([
      "all",
      "employee",
      "candidate",
      "asset",
      "vendor",
      "leave",
      "attendance",
      "payroll",
      "invoice",
      "purchase",
      "notification",
    ])
    .withMessage("Invalid search type."),
];

// ============================================
// Suggestions Validation
// ============================================

const suggestionValidator = [
  query("q")
    .trim()
    .notEmpty()
    .withMessage("Keyword is required.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Keyword length must be between 1 and 50."),
];

// ============================================
// Analytics Validation
// ============================================

const analyticsValidator = [
  query("from").optional().isISO8601().withMessage("Invalid from date."),

  query("to").optional().isISO8601().withMessage("Invalid to date."),
];

module.exports = {
  globalSearchValidator,
  suggestionValidator,
  analyticsValidator,
};

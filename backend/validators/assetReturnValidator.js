const { body, param, query } = require("express-validator");

// ======================================
// Create Return Validator
// ======================================
const createAssetReturnValidator = [
  body("assignment")
    .notEmpty()
    .withMessage("Assignment is required.")
    .isMongoId()
    .withMessage("Invalid assignment id."),

  body("receivedBy")
    .optional()
    .isMongoId()
    .withMessage("Invalid received by user id."),

  body("returnDate").optional().isISO8601().withMessage("Invalid return date."),

  body("returnCondition")
    .optional()
    .isIn(["NEW", "GOOD", "FAIR", "DAMAGED", "LOST"])
    .withMessage("Invalid return condition."),

  body("penaltyAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Penalty amount cannot be negative."),

  body("damageDescription")
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Damage description cannot exceed 2000 characters."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),

  body("attachments")
    .optional()
    .isArray()
    .withMessage("Attachments must be an array."),
];

// ======================================
// Update Return Validator
// ======================================
const updateAssetReturnValidator = [
  param("id").isMongoId().withMessage("Invalid asset return id."),

  body("receivedBy")
    .optional()
    .isMongoId()
    .withMessage("Invalid received by user id."),

  body("returnDate").optional().isISO8601().withMessage("Invalid return date."),

  body("returnCondition")
    .optional()
    .isIn(["NEW", "GOOD", "FAIR", "DAMAGED", "LOST"])
    .withMessage("Invalid return condition."),

  body("penaltyAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Penalty amount cannot be negative."),

  body("damageDescription")
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Damage description cannot exceed 2000 characters."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),

  body("attachments")
    .optional()
    .isArray()
    .withMessage("Attachments must be an array."),
];

// ======================================
// Return ID Validator
// ======================================
const assetReturnIdValidator = [
  param("id").isMongoId().withMessage("Invalid asset return id."),
];

// ======================================
// List Validator
// ======================================
const listAssetReturnValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),

  query("employee").optional().isMongoId().withMessage("Invalid employee id."),

  query("asset").optional().isMongoId().withMessage("Invalid asset id."),

  query("returnCondition")
    .optional()
    .isIn(["NEW", "GOOD", "FAIR", "DAMAGED", "LOST"])
    .withMessage("Invalid return condition."),

  query("startDate").optional().isISO8601().withMessage("Invalid start date."),

  query("endDate").optional().isISO8601().withMessage("Invalid end date."),

  query("sortBy")
    .optional()
    .isIn([
      "returnDate",
      "createdAt",
      "updatedAt",
      "penaltyAmount",
      "returnCondition",
    ])
    .withMessage("Invalid sort field."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];

module.exports = {
  createAssetReturnValidator,
  updateAssetReturnValidator,
  assetReturnIdValidator,
  listAssetReturnValidator,
};

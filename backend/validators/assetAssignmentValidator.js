const { body, param, query } = require("express-validator");

// ======================================
// Create Assignment Validator
// ======================================
const createAssignmentValidator = [
  body("asset")
    .notEmpty()
    .withMessage("Asset is required.")
    .isMongoId()
    .withMessage("Invalid asset id."),

  body("employee")
    .notEmpty()
    .withMessage("Employee is required.")
    .isMongoId()
    .withMessage("Invalid employee id."),

  body("assignmentDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid assignment date."),

  body("expectedReturnDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid expected return date."),

  body("issuedCondition")
    .optional()
    .isIn(["NEW", "GOOD", "FAIR", "DAMAGED"])
    .withMessage("Invalid issued condition."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// ======================================
// Return Asset Validator
// ======================================
const returnAssignmentValidator = [
  param("id").isMongoId().withMessage("Invalid assignment id."),

  body("actualReturnDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid return date."),

  body("returnedCondition")
    .optional()
    .isIn(["NEW", "GOOD", "FAIR", "DAMAGED"])
    .withMessage("Invalid returned condition."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// ======================================
// Update Assignment Validator
// ======================================
const updateAssignmentValidator = [
  param("id").isMongoId().withMessage("Invalid assignment id."),

  body("expectedReturnDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid expected return date."),

  body("assignmentStatus")
    .optional()
    .isIn(["ASSIGNED", "RETURNED", "OVERDUE", "LOST", "DAMAGED"])
    .withMessage("Invalid assignment status."),

  body("issuedCondition")
    .optional()
    .isIn(["NEW", "GOOD", "FAIR", "DAMAGED"])
    .withMessage("Invalid issued condition."),

  body("returnedCondition")
    .optional()
    .isIn(["NEW", "GOOD", "FAIR", "DAMAGED"])
    .withMessage("Invalid returned condition."),

  body("acknowledgement")
    .optional()
    .isBoolean()
    .withMessage("Acknowledgement must be true or false."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// ======================================
// Assignment ID Validator
// ======================================
const assignmentIdValidator = [
  param("id").isMongoId().withMessage("Invalid assignment id."),
];

// ======================================
// List Assignment Validator
// ======================================
const listAssignmentValidator = [
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

  query("assignmentStatus")
    .optional()
    .isIn(["ASSIGNED", "RETURNED", "OVERDUE", "LOST", "DAMAGED"])
    .withMessage("Invalid assignment status."),

  query("sortBy")
    .optional()
    .isIn([
      "createdAt",
      "updatedAt",
      "assignmentDate",
      "expectedReturnDate",
      "assignmentStatus",
    ])
    .withMessage("Invalid sort field."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];

module.exports = {
  createAssignmentValidator,
  returnAssignmentValidator,
  updateAssignmentValidator,
  assignmentIdValidator,
  listAssignmentValidator,
};

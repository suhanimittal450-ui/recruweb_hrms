const { body, param, query } = require("express-validator");

// ======================================
// Create Warranty Validator
// ======================================
const createWarrantyValidator = [
  body("asset")
    .notEmpty()
    .withMessage("Asset is required.")
    .isMongoId()
    .withMessage("Invalid asset id."),

  body("vendor")
    .notEmpty()
    .withMessage("Vendor is required.")
    .isMongoId()
    .withMessage("Invalid vendor id."),

  body("warrantyNumber")
    .trim()
    .notEmpty()
    .withMessage("Warranty number is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Warranty number must be between 3 and 100 characters."),

  body("warrantyType")
    .optional()
    .isIn(["MANUFACTURER", "EXTENDED", "AMC", "INSURANCE"])
    .withMessage("Invalid warranty type."),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required.")
    .isISO8601()
    .withMessage("Invalid start date."),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required.")
    .isISO8601()
    .withMessage("Invalid end date."),

  body("warrantyPeriodMonths")
    .isInt({ min: 1 })
    .withMessage("Warranty period must be at least 1 month."),

  body("coverage")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Coverage cannot exceed 1000 characters."),

  body("termsAndConditions")
    .optional()
    .isLength({ max: 3000 })
    .withMessage("Terms & Conditions cannot exceed 3000 characters."),

  body("supportPhone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid support phone number."),

  body("supportEmail")
    .optional()
    .isEmail()
    .withMessage("Invalid support email."),

  body("supportWebsite")
    .optional()
    .isURL()
    .withMessage("Invalid support website URL."),

  body("status")
    .optional()
    .isIn(["ACTIVE", "EXPIRED", "VOID", "CLAIMED"])
    .withMessage("Invalid warranty status."),

  body("claimCount")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Claim count cannot be negative."),

  body("notes")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Notes cannot exceed 1000 characters."),
];

// ======================================
// Update Warranty Validator
// ======================================
const updateWarrantyValidator = [
  param("id").isMongoId().withMessage("Invalid warranty id."),

  body("asset").optional().isMongoId().withMessage("Invalid asset id."),

  body("vendor").optional().isMongoId().withMessage("Invalid vendor id."),

  body("warrantyNumber")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Warranty number must be between 3 and 100 characters."),

  body("warrantyType")
    .optional()
    .isIn(["MANUFACTURER", "EXTENDED", "AMC", "INSURANCE"])
    .withMessage("Invalid warranty type."),

  body("startDate").optional().isISO8601().withMessage("Invalid start date."),

  body("endDate").optional().isISO8601().withMessage("Invalid end date."),

  body("warrantyPeriodMonths")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Warranty period must be at least 1 month."),

  body("supportEmail")
    .optional()
    .isEmail()
    .withMessage("Invalid support email."),

  body("supportWebsite")
    .optional()
    .isURL()
    .withMessage("Invalid support website URL."),

  body("status")
    .optional()
    .isIn(["ACTIVE", "EXPIRED", "VOID", "CLAIMED"])
    .withMessage("Invalid warranty status."),

  body("claimCount")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Claim count cannot be negative."),
];

// ======================================
// Warranty ID Validator
// ======================================
const warrantyIdValidator = [
  param("id").isMongoId().withMessage("Invalid warranty id."),
];

// ======================================
// Warranty List Validator
// ======================================
const listWarrantyValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),

  query("asset").optional().isMongoId().withMessage("Invalid asset id."),

  query("vendor").optional().isMongoId().withMessage("Invalid vendor id."),

  query("status")
    .optional()
    .isIn(["ACTIVE", "EXPIRED", "VOID", "CLAIMED"])
    .withMessage("Invalid status."),

  query("expired")
    .optional()
    .isBoolean()
    .withMessage("Expired must be true or false."),

  query("sortBy")
    .optional()
    .isIn([
      "createdAt",
      "updatedAt",
      "startDate",
      "endDate",
      "warrantyNumber",
      "status",
    ])
    .withMessage("Invalid sort field."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];

module.exports = {
  createWarrantyValidator,
  updateWarrantyValidator,
  warrantyIdValidator,
  listWarrantyValidator,
};

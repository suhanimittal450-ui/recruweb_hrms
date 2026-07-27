const { body, param, query } = require("express-validator");

// ======================================
// Create Validator
// ======================================

const createDepreciationValidator = [
  body("asset")
    .notEmpty()
    .withMessage("Asset is required.")
    .isMongoId()
    .withMessage("Invalid asset id."),

  body("purchaseDetail")
    .notEmpty()
    .withMessage("Purchase detail is required.")
    .isMongoId()
    .withMessage("Invalid purchase detail id."),

  body("method")
    .notEmpty()
    .withMessage("Depreciation method is required.")
    .isIn(["SLM", "WDV", "DECLINING_BALANCE"])
    .withMessage("Invalid depreciation method."),

  body("purchaseCost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Purchase cost must be greater than or equal to 0."),

  body("salvageValue")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid salvage value."),

  body("usefulLifeYears")
    .notEmpty()
    .withMessage("Useful life is required.")
    .isInt({ min: 1 })
    .withMessage("Useful life must be at least 1 year."),

  body("depreciationRate")
    .notEmpty()
    .withMessage("Depreciation rate is required.")
    .isFloat({ min: 0 })
    .withMessage("Invalid depreciation rate."),

  body("depreciationStartDate")
    .notEmpty()
    .withMessage("Depreciation start date is required.")
    .isISO8601()
    .withMessage("Invalid depreciation start date."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// ======================================
// Update Validator
// ======================================

const updateDepreciationValidator = [
  param("id").isMongoId().withMessage("Invalid depreciation id."),

  body("method")
    .optional()
    .isIn(["SLM", "WDV", "DECLINING_BALANCE"])
    .withMessage("Invalid depreciation method."),

  body("salvageValue")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid salvage value."),

  body("usefulLifeYears")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Useful life must be at least 1 year."),

  body("depreciationRate")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid depreciation rate."),

  body("status")
    .optional()
    .isIn(["ACTIVE", "COMPLETED", "STOPPED"])
    .withMessage("Invalid status."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// ======================================
// ID Validator
// ======================================

const depreciationIdValidator = [
  param("id").isMongoId().withMessage("Invalid depreciation id."),
];

// ======================================
// List Validator
// ======================================

const listDepreciationValidator = [
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Invalid limit."),

  query("asset").optional().isMongoId().withMessage("Invalid asset id."),

  query("method")
    .optional()
    .isIn(["SLM", "WDV", "DECLINING_BALANCE"])
    .withMessage("Invalid depreciation method."),

  query("status")
    .optional()
    .isIn(["ACTIVE", "COMPLETED", "STOPPED"])
    .withMessage("Invalid status."),

  query("sortBy")
    .optional()
    .isIn([
      "purchaseCost",
      "annualDepreciation",
      "monthlyDepreciation",
      "currentBookValue",
      "createdAt",
    ])
    .withMessage("Invalid sort field."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];

module.exports = {
  createDepreciationValidator,
  updateDepreciationValidator,
  depreciationIdValidator,
  listDepreciationValidator,
};

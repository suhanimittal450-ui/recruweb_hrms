const { body, param, query } = require("express-validator");

// =====================================
// Create Asset Category
// =====================================
const createAssetCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Category name must be between 2 and 100 characters."),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Category code is required.")
    .isLength({ min: 2, max: 20 })
    .withMessage("Category code must be between 2 and 20 characters.")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Category code may contain only letters, numbers, hyphens and underscores.",
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters."),

  body("depreciationRate")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Depreciation rate must be between 0 and 100."),

  body("usefulLifeYears")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Useful life must be at least 1 year."),

  body("color").optional().isString().withMessage("Color must be a string."),

  body("icon").optional().isString().withMessage("Icon must be a string."),

  body("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status."),
];

// =====================================
// Update Asset Category
// =====================================
const updateAssetCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid category id."),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Category name must be between 2 and 100 characters."),

  body("code")
    .optional()
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("Category code must be between 2 and 20 characters.")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Category code may contain only letters, numbers, hyphens and underscores.",
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters."),

  body("depreciationRate")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Depreciation rate must be between 0 and 100."),

  body("usefulLifeYears")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Useful life must be at least 1 year."),

  body("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status."),
];

// =====================================
// Mongo Id Validator
// =====================================
const idValidator = [
  param("id").isMongoId().withMessage("Invalid category id."),
];

// =====================================
// List Validator
// =====================================
const listAssetCategoryValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),

  query("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];

module.exports = {
  createAssetCategoryValidator,
  updateAssetCategoryValidator,
  idValidator,
  listAssetCategoryValidator,
};

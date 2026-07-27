const { body, param, query } = require("express-validator");

// ======================================
// Create Asset Validator
// ======================================
const createAssetValidator = [
  body("assetCode")
    .trim()
    .notEmpty()
    .withMessage("Asset code is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("Asset code must be between 2 and 50 characters."),

  body("assetName")
    .trim()
    .notEmpty()
    .withMessage("Asset name is required.")
    .isLength({ min: 2, max: 150 })
    .withMessage("Asset name must be between 2 and 150 characters."),

  body("category")
    .notEmpty()
    .withMessage("Asset category is required.")
    .isMongoId()
    .withMessage("Invalid category id."),

  body("vendor").optional().isMongoId().withMessage("Invalid vendor id."),

  body("serialNumber")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Serial number cannot exceed 100 characters."),

  body("purchaseDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid purchase date."),

  body("purchaseCost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Purchase cost must be greater than or equal to 0."),

  body("currentValue")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Current value must be greater than or equal to 0."),

  body("warrantyExpiry")
    .optional()
    .isISO8601()
    .withMessage("Invalid warranty expiry date."),

  body("location")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Location cannot exceed 150 characters."),

  body("status")
    .optional()
    .isIn([
      "AVAILABLE",
      "ASSIGNED",
      "UNDER_MAINTENANCE",
      "RETIRED",
      "LOST",
      "DAMAGED",
    ])
    .withMessage("Invalid asset status."),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Notes cannot exceed 1000 characters."),
];

// ======================================
// Update Asset Validator
// ======================================
const updateAssetValidator = [
  param("id").isMongoId().withMessage("Invalid asset id."),

  body("assetCode")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Asset code must be between 2 and 50 characters."),

  body("assetName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage("Asset name must be between 2 and 150 characters."),

  body("category").optional().isMongoId().withMessage("Invalid category id."),

  body("vendor").optional().isMongoId().withMessage("Invalid vendor id."),

  body("purchaseDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid purchase date."),

  body("purchaseCost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Purchase cost must be greater than or equal to 0."),

  body("currentValue")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Current value must be greater than or equal to 0."),

  body("warrantyExpiry")
    .optional()
    .isISO8601()
    .withMessage("Invalid warranty expiry date."),

  body("status")
    .optional()
    .isIn([
      "AVAILABLE",
      "ASSIGNED",
      "UNDER_MAINTENANCE",
      "RETIRED",
      "LOST",
      "DAMAGED",
    ])
    .withMessage("Invalid asset status."),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Notes cannot exceed 1000 characters."),
];

// ======================================
// Mongo Id Validator
// ======================================
const assetIdValidator = [
  param("id").isMongoId().withMessage("Invalid asset id."),
];

// ======================================
// List Validator
// ======================================
const listAssetValidator = [
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
    .isIn([
      "AVAILABLE",
      "ASSIGNED",
      "UNDER_MAINTENANCE",
      "RETIRED",
      "LOST",
      "DAMAGED",
    ])
    .withMessage("Invalid status."),

  query("category").optional().isMongoId().withMessage("Invalid category id."),

  query("sortBy")
    .optional()
    .isIn([
      "assetName",
      "assetCode",
      "purchaseDate",
      "purchaseCost",
      "createdAt",
      "updatedAt",
      "status",
    ])
    .withMessage("Invalid sort field."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];

module.exports = {
  createAssetValidator,
  updateAssetValidator,
  assetIdValidator,
  listAssetValidator,
};

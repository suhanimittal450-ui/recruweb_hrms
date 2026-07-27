const { body, param, query } = require("express-validator");

// ======================================
// Create Barcode Validator
// ======================================

const createBarcodeValidator = [
  body("asset")
    .notEmpty()
    .withMessage("Asset is required.")
    .isMongoId()
    .withMessage("Invalid asset id."),

  body("barcodeNumber")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Barcode number must be between 3 and 100 characters."),

  body("format")
    .optional()
    .isIn(["CODE128", "CODE39", "EAN13", "EAN8", "UPC"])
    .withMessage("Invalid barcode format."),

  body("width")
    .optional()
    .isFloat({ min: 1, max: 10 })
    .withMessage("Width must be between 1 and 10."),

  body("height")
    .optional()
    .isFloat({ min: 20, max: 300 })
    .withMessage("Height must be between 20 and 300."),

  body("displayValue")
    .optional()
    .isBoolean()
    .withMessage("Display value must be true or false."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// ======================================
// Update Barcode Validator
// ======================================

const updateBarcodeValidator = [
  param("id").isMongoId().withMessage("Invalid barcode id."),

  body("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid barcode status."),

  body("format")
    .optional()
    .isIn(["CODE128", "CODE39", "EAN13", "EAN8", "UPC"])
    .withMessage("Invalid barcode format."),

  body("width")
    .optional()
    .isFloat({ min: 1, max: 10 })
    .withMessage("Invalid width."),

  body("height")
    .optional()
    .isFloat({ min: 20, max: 300 })
    .withMessage("Invalid height."),

  body("displayValue")
    .optional()
    .isBoolean()
    .withMessage("Display value must be boolean."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// ======================================
// Barcode Id Validator
// ======================================

const barcodeIdValidator = [
  param("id").isMongoId().withMessage("Invalid barcode id."),
];

// ======================================
// Asset Id Validator
// ======================================

const assetIdValidator = [
  param("assetId").isMongoId().withMessage("Invalid asset id."),
];

// ======================================
// List Validator
// ======================================

const listBarcodeValidator = [
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

  query("format")
    .optional()
    .isIn(["CODE128", "CODE39", "EAN13", "EAN8", "UPC"])
    .withMessage("Invalid barcode format."),

  query("sortBy")
    .optional()
    .isIn([
      "barcodeNumber",
      "createdAt",
      "generatedAt",
      "printCount",
      "downloadCount",
    ])
    .withMessage("Invalid sort field."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];

module.exports = {
  createBarcodeValidator,
  updateBarcodeValidator,
  barcodeIdValidator,
  assetIdValidator,
  listBarcodeValidator,
};

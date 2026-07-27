const { body, param, query } = require("express-validator");

// ======================================
// Create QR Code Validator
// ======================================

const createQRCodeValidator = [
  body("asset")
    .notEmpty()
    .withMessage("Asset is required.")
    .isMongoId()
    .withMessage("Invalid asset id."),

  body("qrCode")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("QR Code must be between 3 and 100 characters."),

  body("verificationUrl")
    .optional()
    .isURL()
    .withMessage("Invalid verification URL."),

  body("size")
    .optional()
    .isInt({ min: 100, max: 1000 })
    .withMessage("QR size must be between 100 and 1000."),

  body("foregroundColor")
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage("Invalid foreground color."),

  body("backgroundColor")
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage("Invalid background color."),

  body("errorCorrectionLevel")
    .optional()
    .isIn(["L", "M", "Q", "H"])
    .withMessage("Invalid error correction level."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// ======================================
// Update Validator
// ======================================

const updateQRCodeValidator = [
  param("id").isMongoId().withMessage("Invalid QR Code id."),

  body("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status."),

  body("size")
    .optional()
    .isInt({ min: 100, max: 1000 })
    .withMessage("Invalid size."),

  body("foregroundColor")
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage("Invalid foreground color."),

  body("backgroundColor")
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage("Invalid background color."),

  body("errorCorrectionLevel")
    .optional()
    .isIn(["L", "M", "Q", "H"])
    .withMessage("Invalid error correction level."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// ======================================
// QR Code ID Validator
// ======================================

const qrCodeIdValidator = [
  param("id").isMongoId().withMessage("Invalid QR Code id."),
];

// ======================================
// Asset ID Validator
// ======================================

const assetIdValidator = [
  param("assetId").isMongoId().withMessage("Invalid asset id."),
];

// ======================================
// List Validator
// ======================================

const listQRCodeValidator = [
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

  query("sortBy")
    .optional()
    .isIn([
      "qrCode",
      "createdAt",
      "generatedAt",
      "scanCount",
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
  createQRCodeValidator,
  updateQRCodeValidator,
  qrCodeIdValidator,
  assetIdValidator,
  listQRCodeValidator,
};

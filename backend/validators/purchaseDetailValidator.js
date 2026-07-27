const { body, param, query } = require("express-validator");

// =====================================
// Create Purchase Validator
// =====================================
const createPurchaseValidator = [
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

  body("purchaseDate")
    .notEmpty()
    .withMessage("Purchase date is required.")
    .isISO8601()
    .withMessage("Invalid purchase date."),

  body("purchaseCost")
    .notEmpty()
    .withMessage("Purchase cost is required.")
    .isFloat({ min: 0 })
    .withMessage("Purchase cost must be greater than or equal to 0."),

  body("taxAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid tax amount."),

  body("discountAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid discount amount."),

  body("shippingCost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid shipping cost."),

  body("installationCost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid installation cost."),

  body("currency")
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be 3 characters."),

  body("paymentMethod")
    .optional()
    .isIn(["CASH", "BANK_TRANSFER", "UPI", "CHEQUE", "CARD"])
    .withMessage("Invalid payment method."),

  body("paymentStatus")
    .optional()
    .isIn(["PENDING", "PARTIAL", "PAID"])
    .withMessage("Invalid payment status."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// =====================================
// Update Purchase Validator
// =====================================
const updatePurchaseValidator = [
  param("id").isMongoId().withMessage("Invalid purchase id."),

  body("asset").optional().isMongoId().withMessage("Invalid asset id."),

  body("vendor").optional().isMongoId().withMessage("Invalid vendor id."),

  body("purchaseCost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid purchase cost."),

  body("taxAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid tax amount."),

  body("discountAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid discount amount."),

  body("shippingCost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid shipping cost."),

  body("installationCost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid installation cost."),

  body("paymentMethod")
    .optional()
    .isIn(["CASH", "BANK_TRANSFER", "UPI", "CHEQUE", "CARD"])
    .withMessage("Invalid payment method."),

  body("paymentStatus")
    .optional()
    .isIn(["PENDING", "PARTIAL", "PAID"])
    .withMessage("Invalid payment status."),
];

// =====================================
// Purchase ID Validator
// =====================================
const purchaseIdValidator = [
  param("id").isMongoId().withMessage("Invalid purchase id."),
];

// =====================================
// List Validator
// =====================================
const listPurchaseValidator = [
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Invalid limit."),

  query("asset").optional().isMongoId().withMessage("Invalid asset id."),

  query("vendor").optional().isMongoId().withMessage("Invalid vendor id."),

  query("paymentStatus")
    .optional()
    .isIn(["PENDING", "PARTIAL", "PAID"])
    .withMessage("Invalid payment status."),

  query("paymentMethod")
    .optional()
    .isIn(["CASH", "BANK_TRANSFER", "UPI", "CHEQUE", "CARD"])
    .withMessage("Invalid payment method."),

  query("sortBy")
    .optional()
    .isIn([
      "purchaseDate",
      "purchaseCost",
      "totalCost",
      "paymentStatus",
      "createdAt",
    ])
    .withMessage("Invalid sort field."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];

module.exports = {
  createPurchaseValidator,
  updatePurchaseValidator,
  purchaseIdValidator,
  listPurchaseValidator,
};

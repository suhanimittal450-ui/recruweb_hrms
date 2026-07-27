const { body, param, query } = require("express-validator");

// ======================================
// Upload Invoice Validator
// ======================================

const uploadInvoiceValidator = [
  body("purchaseDetail")
    .notEmpty()
    .withMessage("Purchase detail is required.")
    .isMongoId()
    .withMessage("Invalid purchase detail id."),

  body("invoiceNumber")
    .notEmpty()
    .withMessage("Invoice number is required.")
    .trim(),

  body("invoiceType")
    .optional()
    .isIn(["PURCHASE", "AMC", "SERVICE", "WARRANTY", "OTHER"])
    .withMessage("Invalid invoice type."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// ======================================
// Replace Invoice Validator
// ======================================

const replaceInvoiceValidator = [
  param("id").isMongoId().withMessage("Invalid invoice id."),
];

// ======================================
// Invoice Id Validator
// ======================================

const invoiceIdValidator = [
  param("id").isMongoId().withMessage("Invalid invoice id."),
];

// ======================================
// Purchase Detail Validator
// ======================================

const purchaseDetailValidator = [
  param("purchaseDetailId")
    .isMongoId()
    .withMessage("Invalid purchase detail id."),
];

// ======================================
// List Validator
// ======================================

const listInvoiceValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),

  query("invoiceType")
    .optional()
    .isIn(["PURCHASE", "AMC", "SERVICE", "WARRANTY", "OTHER"])
    .withMessage("Invalid invoice type."),

  query("uploadStatus")
    .optional()
    .isIn(["UPLOADED", "REPLACED", "DELETED"])
    .withMessage("Invalid upload status."),

  query("purchaseDetail")
    .optional()
    .isMongoId()
    .withMessage("Invalid purchase detail id."),

  query("sortBy")
    .optional()
    .isIn(["invoiceNumber", "createdAt", "updatedAt", "version"])
    .withMessage("Invalid sort field."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];

// ======================================
// File Validator Middleware
// ======================================

const invoiceFileValidator = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Invoice file is required.",
    });
  }

  const allowedMimeTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];

  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      success: false,
      message: "Only PDF, PNG, JPG and JPEG files are allowed.",
    });
  }

  // 10 MB
  const maxSize = 10 * 1024 * 1024;

  if (req.file.size > maxSize) {
    return res.status(400).json({
      success: false,
      message: "Maximum file size is 10 MB.",
    });
  }

  next();
};

module.exports = {
  uploadInvoiceValidator,
  replaceInvoiceValidator,
  invoiceIdValidator,
  purchaseDetailValidator,
  listInvoiceValidator,
  invoiceFileValidator,
};

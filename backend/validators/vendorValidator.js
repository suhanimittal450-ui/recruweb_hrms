const { body, param, query } = require("express-validator");

// ======================================
// Create Vendor Validator
// ======================================
const createVendorValidator = [
  body("vendorCode")
    .trim()
    .notEmpty()
    .withMessage("Vendor code is required.")
    .isLength({ min: 2, max: 30 })
    .withMessage("Vendor code must be between 2 and 30 characters."),

  body("vendorName")
    .trim()
    .notEmpty()
    .withMessage("Vendor name is required.")
    .isLength({ min: 2, max: 150 })
    .withMessage("Vendor name must be between 2 and 150 characters."),

  body("contactPerson")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Contact person cannot exceed 100 characters."),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),

  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number."),

  body("alternatePhone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid alternate phone number."),

  body("website").optional().isURL().withMessage("Invalid website URL."),

  body("gstNumber")
    .optional()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/)
    .withMessage("Invalid GST number."),

  body("panNumber")
    .optional()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .withMessage("Invalid PAN number."),

  body("address.line1").optional().trim(),

  body("address.line2").optional().trim(),

  body("address.city").optional().trim(),

  body("address.state").optional().trim(),

  body("address.country").optional().trim(),

  body("address.postalCode").optional().trim(),

  body("paymentTerms").optional().trim(),

  body("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE", "BLACKLISTED"])
    .withMessage("Invalid vendor status."),

  body("notes")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Notes cannot exceed 1000 characters."),
];

// ======================================
// Update Vendor Validator
// ======================================
const updateVendorValidator = [
  param("id").isMongoId().withMessage("Invalid vendor id."),

  body("vendorCode").optional().trim().isLength({ min: 2, max: 30 }),

  body("vendorName").optional().trim().isLength({ min: 2, max: 150 }),

  body("email").optional().isEmail().withMessage("Invalid email."),

  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number."),

  body("alternatePhone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid alternate phone number."),

  body("website").optional().isURL().withMessage("Invalid website URL."),

  body("gstNumber")
    .optional()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/)
    .withMessage("Invalid GST number."),

  body("panNumber")
    .optional()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .withMessage("Invalid PAN number."),

  body("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE", "BLACKLISTED"])
    .withMessage("Invalid vendor status."),
];

// ======================================
// Vendor ID Validator
// ======================================
const vendorIdValidator = [
  param("id").isMongoId().withMessage("Invalid vendor id."),
];

// ======================================
// Vendor List Validator
// ======================================
const listVendorValidator = [
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
    .isIn(["ACTIVE", "INACTIVE", "BLACKLISTED"])
    .withMessage("Invalid status."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];

module.exports = {
  createVendorValidator,
  updateVendorValidator,
  vendorIdValidator,
  listVendorValidator,
};

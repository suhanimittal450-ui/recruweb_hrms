const { body, param, query } = require("express-validator");
const express = require("express");
const router = express.Router();
// ======================================
// Create Maintenance Validator
// ======================================
const createMaintenanceValidator = [
  body("asset")
    .notEmpty()
    .withMessage("Asset is required.")
    .isMongoId()
    .withMessage("Invalid asset id."),

  body("vendor").optional().isMongoId().withMessage("Invalid vendor id."),

  body("maintenanceType")
    .notEmpty()
    .withMessage("Maintenance type is required.")
    .isIn(["PREVENTIVE", "CORRECTIVE", "AMC", "CALIBRATION", "INSPECTION"])
    .withMessage("Invalid maintenance type."),

  body("priority")
    .optional()
    .isIn(["LOW", "MEDIUM", "HIGH", "CRITICAL"])
    .withMessage("Invalid priority."),

  body("scheduledDate")
    .notEmpty()
    .withMessage("Scheduled date is required.")
    .isISO8601()
    .withMessage("Invalid scheduled date."),

  body("cost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Cost cannot be negative."),

  body("downtimeHours")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Downtime cannot be negative."),

  body("technicianName")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Technician name cannot exceed 100 characters."),

  body("technicianPhone")
    .optional()
    .isLength({ min: 10, max: 15 })
    .withMessage("Invalid technician phone number."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// ======================================
// Update Maintenance Validator
// ======================================
const updateMaintenanceValidator = [
  param("id").isMongoId().withMessage("Invalid maintenance id."),

  body("vendor").optional().isMongoId().withMessage("Invalid vendor id."),

  body("maintenanceType")
    .optional()
    .isIn(["PREVENTIVE", "CORRECTIVE", "AMC", "CALIBRATION", "INSPECTION"])
    .withMessage("Invalid maintenance type."),

  body("priority")
    .optional()
    .isIn(["LOW", "MEDIUM", "HIGH", "CRITICAL"])
    .withMessage("Invalid priority."),

  body("status")
    .optional()
    .isIn(["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
    .withMessage("Invalid status."),

  body("scheduledDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid scheduled date."),

  body("startDate").optional().isISO8601().withMessage("Invalid start date."),

  body("completedDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid completed date."),

  body("cost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Cost cannot be negative."),

  body("downtimeHours")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Downtime cannot be negative."),
];

// ======================================
// Complete Maintenance Validator
// ======================================
const completeMaintenanceValidator = [
  param("id").isMongoId().withMessage("Invalid maintenance id."),

  body("completedDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid completed date."),

  body("nextMaintenanceDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid next maintenance date."),

  body("serviceReport")
    .optional()
    .isLength({ max: 3000 })
    .withMessage("Service report cannot exceed 3000 characters."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// ======================================
// ID Validator
// ======================================
const maintenanceIdValidator = [
  param("id").isMongoId().withMessage("Invalid maintenance id."),
];

// ======================================
// List Validator
// ======================================
const listMaintenanceValidator = [
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Invalid limit."),

  query("asset").optional().isMongoId().withMessage("Invalid asset id."),

  query("vendor").optional().isMongoId().withMessage("Invalid vendor id."),

  query("maintenanceType")
    .optional()
    .isIn(["PREVENTIVE", "CORRECTIVE", "AMC", "CALIBRATION", "INSPECTION"])
    .withMessage("Invalid maintenance type."),

  query("priority")
    .optional()
    .isIn(["LOW", "MEDIUM", "HIGH", "CRITICAL"])
    .withMessage("Invalid priority."),

  query("status")
    .optional()
    .isIn(["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
    .withMessage("Invalid status."),

  query("sortBy")
    .optional()
    .isIn([
      "createdAt",
      "scheduledDate",
      "completedDate",
      "cost",
      "priority",
      "status",
    ])
    .withMessage("Invalid sort field."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];
module.exports = router;

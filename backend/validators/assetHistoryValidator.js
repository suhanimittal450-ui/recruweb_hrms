const { body, param, query } = require("express-validator");

// =====================================
// Create Asset History Validator
// =====================================
const createAssetHistoryValidator = [
  body("asset")
    .notEmpty()
    .withMessage("Asset is required.")
    .isMongoId()
    .withMessage("Invalid asset id."),

  body("action")
    .notEmpty()
    .withMessage("Action is required.")
    .isIn([
      "CREATED",
      "UPDATED",
      "ASSIGNED",
      "RETURNED",
      "MAINTENANCE_CREATED",
      "MAINTENANCE_COMPLETED",
      "STATUS_CHANGED",
      "LOCATION_CHANGED",
      "OWNER_CHANGED",
      "DEPRECIATION",
      "BARCODE_GENERATED",
      "QRCODE_GENERATED",
      "SCANNED",
      "DISPOSED",
    ])
    .withMessage("Invalid action."),

  body("referenceModel")
    .optional()
    .isIn([
      "Asset",
      "AssetAssignment",
      "AssetReturn",
      "AssetMaintenance",
      "Warranty",
      "Vendor",
      "PurchaseDetail",
    ])
    .withMessage("Invalid reference model."),

  body("referenceId")
    .optional()
    .isMongoId()
    .withMessage("Invalid reference id."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

// =====================================
// History ID Validator
// =====================================
const assetHistoryIdValidator = [
  param("id").isMongoId().withMessage("Invalid asset history id."),
];

// =====================================
// Asset ID Validator
// =====================================
const assetIdValidator = [
  param("assetId").isMongoId().withMessage("Invalid asset id."),
];

// =====================================
// List Validator
// =====================================
const listAssetHistoryValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),

  query("asset").optional().isMongoId().withMessage("Invalid asset id."),

  query("action")
    .optional()
    .isIn([
      "CREATED",
      "UPDATED",
      "ASSIGNED",
      "RETURNED",
      "MAINTENANCE_CREATED",
      "MAINTENANCE_COMPLETED",
      "STATUS_CHANGED",
      "LOCATION_CHANGED",
      "OWNER_CHANGED",
      "DEPRECIATION",
      "BARCODE_GENERATED",
      "QRCODE_GENERATED",
      "SCANNED",
      "DISPOSED",
    ])
    .withMessage("Invalid action."),

  query("referenceModel")
    .optional()
    .isIn([
      "Asset",
      "AssetAssignment",
      "AssetReturn",
      "AssetMaintenance",
      "Warranty",
      "Vendor",
      "PurchaseDetail",
    ])
    .withMessage("Invalid reference model."),

  query("search").optional().isString().withMessage("Search must be a string."),

  query("sortBy")
    .optional()
    .isIn(["createdAt", "action"])
    .withMessage("Invalid sort field."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];

module.exports = {
  createAssetHistoryValidator,
  assetHistoryIdValidator,
  assetIdValidator,
  listAssetHistoryValidator,
};

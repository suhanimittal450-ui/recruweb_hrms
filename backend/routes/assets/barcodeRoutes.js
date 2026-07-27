const express = require("express");
const router = express.Router();

const barcodeController = require("../../controllers/assets/barcodeController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");

const {
  createBarcodeValidator,
  updateBarcodeValidator,
  barcodeIdValidator,
  assetIdValidator,
  listBarcodeValidator,
} = require("../../validators/barcodeValidator");

// =====================================
// Generate Barcode
// =====================================
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  createBarcodeValidator,
  validate,
  barcodeController.create,
);

// =====================================
// Get All Barcodes
// =====================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  listBarcodeValidator,
  validate,
  barcodeController.getAll,
);

// =====================================
// Latest Generated
// =====================================
router.get(
  "/latest",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  barcodeController.latest,
);

// =====================================
// Count
// =====================================
router.get(
  "/count",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  barcodeController.count,
);

// =====================================
// Get By Asset
// =====================================
router.get(
  "/asset/:assetId",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  assetIdValidator,
  validate,
  barcodeController.getByAsset,
);

// =====================================
// Get By ID
// =====================================
router.get(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  barcodeIdValidator,
  validate,
  barcodeController.getById,
);

// =====================================
// Regenerate Barcode
// =====================================
router.put(
  "/:id/regenerate",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "ACCOUNTANT"),
  barcodeIdValidator,
  validate,
  barcodeController.regenerate,
);

// =====================================
// Print Barcode
// =====================================
router.patch(
  "/:id/print",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  barcodeIdValidator,
  validate,
  barcodeController.print,
);

// =====================================
// Download Barcode
// =====================================
router.patch(
  "/:id/download",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  barcodeIdValidator,
  validate,
  barcodeController.download,
);

// =====================================
// Update Barcode
// =====================================
router.put(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  updateBarcodeValidator,
  validate,
  barcodeController.regenerate,
);

// =====================================
// Delete Barcode
// =====================================
router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  barcodeIdValidator,
  validate,
  barcodeController.delete,
);

// =====================================
// Restore Barcode
// =====================================
router.patch(
  "/:id/restore",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  barcodeIdValidator,
  validate,
  barcodeController.restore,
);

module.exports = router;

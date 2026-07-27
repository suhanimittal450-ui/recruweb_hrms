const express = require("express");
const router = express.Router();

const qrCodeController = require("../../controllers/assets/qrCodeController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");

const {
  createQRCodeValidator,
  updateQRCodeValidator,
  qrCodeIdValidator,
  assetIdValidator,
  listQRCodeValidator,
} = require("../../validators/qrCodeValidator");

// =====================================
// Generate QR Code
// =====================================
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  createQRCodeValidator,
  validate,
  qrCodeController.create,
);

// =====================================
// Get All QR Codes
// =====================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  listQRCodeValidator,
  validate,
  qrCodeController.getAll,
);

// =====================================
// Latest Generated
// =====================================
router.get(
  "/latest",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  qrCodeController.latest,
);

// =====================================
// Count
// =====================================
router.get(
  "/count",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  qrCodeController.count,
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
  qrCodeController.getByAsset,
);

// =====================================
// Get By ID
// =====================================
router.get(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  qrCodeIdValidator,
  validate,
  qrCodeController.getById,
);

// =====================================
// Regenerate QR Code
// =====================================
router.put(
  "/:id/regenerate",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  qrCodeIdValidator,
  validate,
  qrCodeController.regenerate,
);

// =====================================
// Scan Tracking
// =====================================
router.patch(
  "/:id/scan",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  qrCodeIdValidator,
  validate,
  qrCodeController.scan,
);

// =====================================
// Print Tracking
// =====================================
router.patch(
  "/:id/print",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  qrCodeIdValidator,
  validate,
  qrCodeController.print,
);

// =====================================
// Download Tracking
// =====================================
router.patch(
  "/:id/download",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  qrCodeIdValidator,
  validate,
  qrCodeController.download,
);

// =====================================
// Update QR Code
// =====================================
router.put(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  updateQRCodeValidator,
  validate,
  qrCodeController.update,
);

// =====================================
// Delete QR Code
// =====================================
router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  qrCodeIdValidator,
  validate,
  qrCodeController.delete,
);

// =====================================
// Restore QR Code
// =====================================
router.patch(
  "/:id/restore",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  qrCodeIdValidator,
  validate,
  qrCodeController.restore,
);

module.exports = router;

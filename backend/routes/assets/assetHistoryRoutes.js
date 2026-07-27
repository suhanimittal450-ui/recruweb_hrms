const express = require("express");
const router = express.Router();

const assetHistoryController = require("../../controllers/assets/assetHistoryController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");

const {
  createAssetHistoryValidator,
  assetHistoryIdValidator,
  assetIdValidator,
  listAssetHistoryValidator,
} = require("../../validators/assetHistoryValidator");

// ==========================================
// Create History
// ==========================================
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  createAssetHistoryValidator,
  validate,
  assetHistoryController.create,
);

// ==========================================
// Get All History
// ==========================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  listAssetHistoryValidator,
  validate,
  assetHistoryController.getAll,
);

// ==========================================
// Latest Activities
// ==========================================
router.get(
  "/latest",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetHistoryController.latest,
);

// ==========================================
// Count
// ==========================================
router.get(
  "/count",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetHistoryController.count,
);

// ==========================================
// Get History By Asset
// ==========================================
router.get(
  "/asset/:assetId",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetIdValidator,
  validate,
  assetHistoryController.getByAsset,
);

// ==========================================
// Get By Id
// ==========================================
router.get(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetHistoryIdValidator,
  validate,
  assetHistoryController.getById,
);

// ==========================================
// Delete
// ==========================================
router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  assetHistoryIdValidator,
  validate,
  assetHistoryController.delete,
);

// ==========================================
// Restore
// ==========================================
router.patch(
  "/:id/restore",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  assetHistoryIdValidator,
  validate,
  assetHistoryController.restore,
);

module.exports = router;

const express = require("express");
const router = express.Router();

const assetReturnController = require("../../controllers/assets/assetReturnController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");

const {
  createAssetReturnValidator,
  updateAssetReturnValidator,
  assetReturnIdValidator,
  listAssetReturnValidator,
} = require("../../validators/assetReturnValidator");

// ======================================
// Create Asset Return
// ======================================
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  createAssetReturnValidator,
  validate,
  assetReturnController.create,
);

// ======================================
// Get All Asset Returns
// ======================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  listAssetReturnValidator,
  validate,
  assetReturnController.getAll,
);

// ======================================
// Asset Return Count
// ======================================
router.get(
  "/count",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetReturnController.count,
);

// ======================================
// Damaged Returns
// ======================================
router.get(
  "/damaged",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetReturnController.damagedReturns,
);

// ======================================
// Get Return By Id
// ======================================
router.get(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetReturnIdValidator,
  validate,
  assetReturnController.getById,
);

// ======================================
// Update Return
// ======================================
router.put(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  updateAssetReturnValidator,
  validate,
  assetReturnController.update,
);

// ======================================
// Delete Return
// ======================================
router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  assetReturnIdValidator,
  validate,
  assetReturnController.delete,
);

// ======================================
// Restore Return
// ======================================
router.patch(
  "/:id/restore",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  assetReturnIdValidator,
  validate,
  assetReturnController.restore,
);

module.exports = router;

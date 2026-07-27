const express = require("express");
const router = express.Router();

const assetController = require("../../controllers/assets/assetController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");

const {
  createAssetValidator,
  updateAssetValidator,
  assetIdValidator,
  listAssetValidator,
} = require("../../validators/assetValidator");

// =====================================
// Create Asset
// =====================================
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  createAssetValidator,
  validate,
  assetController.create,
);

// =====================================
// Get All Assets
// =====================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  listAssetValidator,
  validate,
  assetController.getAll,
);

// =====================================
// Asset Count
// =====================================
router.get(
  "/count",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetController.count,
);

// =====================================
// Get Asset By Id
// =====================================
router.get(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetIdValidator,
  validate,
  assetController.getById,
);

// =====================================
// Update Asset
// =====================================
router.put(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  updateAssetValidator,
  validate,
  assetController.update,
);

// =====================================
// Delete Asset (Soft Delete)
// =====================================
router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  assetIdValidator,
  validate,
  assetController.delete,
);

module.exports = router;

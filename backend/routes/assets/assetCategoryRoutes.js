const express = require("express");
const router = express.Router();

const assetCategoryController = require("../../controllers/assets/assetCategoryController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");

const validate = require("../../middlewares/validate");

const {
  createAssetCategoryValidator,
  updateAssetCategoryValidator,
  idValidator,
  listAssetCategoryValidator,
} = require("../../validators/assetCategoryValidator");

// =====================================
// Asset Category Routes
// =====================================

router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  createAssetCategoryValidator,
  validate,
  assetCategoryController.create,
);

router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  listAssetCategoryValidator,
  validate,
  assetCategoryController.getAll,
);

router.get(
  "/count",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetCategoryController.count,
);

router.get(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  idValidator,
  validate,
  assetCategoryController.getById,
);

router.put(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  updateAssetCategoryValidator,
  validate,
  assetCategoryController.update,
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  idValidator,
  validate,
  assetCategoryController.delete,
);

router.patch(
  "/:id/restore",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  idValidator,
  validate,
  assetCategoryController.restore,
);

// Get All
router.get(
  "/",
  authMiddleware,
  authorize("asset_category.view"),
  listAssetCategoryValidator,
  validate,
  assetCategoryController.getAll,
);

// Count
router.get(
  "/count",
  authMiddleware,
  authorize("asset_category.view"),
  assetCategoryController.count,
);

// Get By Id
router.get(
  "/:id",
  authMiddleware,
  authorize("asset_category.view"),
  idValidator,
  validate,
  assetCategoryController.getById,
);

// Update
router.put(
  "/:id",
  authMiddleware,
  authorize("asset_category.update"),
  updateAssetCategoryValidator,
  validate,
  assetCategoryController.update,
);

// Soft Delete
router.delete(
  "/:id",
  authMiddleware,
  authorize("asset_category.delete"),
  idValidator,
  validate,
  assetCategoryController.delete,
);

// Restore
router.patch(
  "/:id/restore",
  authMiddleware,
  authorize("asset_category.restore"),
  idValidator,
  validate,
  assetCategoryController.restore,
);

module.exports = router;

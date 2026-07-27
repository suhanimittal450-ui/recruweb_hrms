const express = require("express");
const router = express.Router();

const warrantyController = require("../../controllers/assets/warrantyController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");

const {
  createWarrantyValidator,
  updateWarrantyValidator,
  warrantyIdValidator,
  listWarrantyValidator,
} = require("../../validators/warrantyValidator");

// =====================================
// Create Warranty
// =====================================
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  createWarrantyValidator,
  validate,
  warrantyController.create,
);

// =====================================
// Get All Warranties
// =====================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  listWarrantyValidator,
  validate,
  warrantyController.getAll,
);

// =====================================
// Warranty Count
// =====================================
router.get(
  "/count",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  warrantyController.count,
);

// =====================================
// Expiring Warranties
// =====================================
router.get(
  "/expiring",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  warrantyController.expiring,
);

// =====================================
// Get Warranty By Id
// =====================================
router.get(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  warrantyIdValidator,
  validate,
  warrantyController.getById,
);

// =====================================
// Update Warranty
// =====================================
router.put(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  updateWarrantyValidator,
  validate,
  warrantyController.update,
);

// =====================================
// Delete Warranty
// =====================================
router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  warrantyIdValidator,
  validate,
  warrantyController.delete,
);

// =====================================
// Restore Warranty
// =====================================
router.patch(
  "/:id/restore",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  warrantyIdValidator,
  validate,
  warrantyController.restore,
);

module.exports = router;

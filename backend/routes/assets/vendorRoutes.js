const express = require("express");
const router = express.Router();

const vendorController = require("../../controllers/assets/vendorController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");

const {
  createVendorValidator,
  updateVendorValidator,
  vendorIdValidator,
  listVendorValidator,
} = require("../../validators/vendorValidator");

// =====================================
// Create Vendor
// =====================================
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  createVendorValidator,
  validate,
  vendorController.create,
);

// =====================================
// Get All Vendors
// =====================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  listVendorValidator,
  validate,
  vendorController.getAll,
);

// =====================================
// Vendor Count
// =====================================
router.get(
  "/count",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  vendorController.count,
);

// =====================================
// Get Vendor By Id
// =====================================
router.get(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  vendorIdValidator,
  validate,
  vendorController.getById,
);

// =====================================
// Update Vendor
// =====================================
router.put(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  updateVendorValidator,
  validate,
  vendorController.update,
);

// =====================================
// Delete Vendor
// =====================================
router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  vendorIdValidator,
  validate,
  vendorController.delete,
);

// =====================================
// Restore Vendor
// =====================================
router.patch(
  "/:id/restore",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  vendorIdValidator,
  validate,
  vendorController.restore,
);

module.exports = router;

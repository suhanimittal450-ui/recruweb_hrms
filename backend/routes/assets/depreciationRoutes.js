const express = require("express");
const router = express.Router();

const depreciationController = require("../../controllers/assets/depreciationController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");

const {
  createDepreciationValidator,
  updateDepreciationValidator,
  depreciationIdValidator,
  listDepreciationValidator,
} = require("../../validators/assets/depreciationValidator");

// =====================================
// Create Depreciation
// =====================================
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  createDepreciationValidator,
  validate,
  depreciationController.create,
);

// =====================================
// Get All
// =====================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  listDepreciationValidator,
  validate,
  depreciationController.getAll,
);

// =====================================
// Count
// =====================================
router.get(
  "/count",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  depreciationController.count,
);

// =====================================
// Monthly Report
// =====================================
router.get(
  "/reports/monthly",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  depreciationController.monthlyReport,
);

// =====================================
// Annual Report
// =====================================
router.get(
  "/reports/annual",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  depreciationController.annualReport,
);

// =====================================
// Book Value Report
// =====================================
router.get(
  "/reports/book-value",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  depreciationController.bookValueReport,
);

// =====================================
// Get By Id
// =====================================
router.get(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  depreciationIdValidator,
  validate,
  depreciationController.getById,
);

// =====================================
// Update
// =====================================
router.put(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "ACCOUNTANT"),
  updateDepreciationValidator,
  validate,
  depreciationController.update,
);

// =====================================
// Delete
// =====================================
router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  depreciationIdValidator,
  validate,
  depreciationController.delete,
);

// =====================================
// Restore
// =====================================
router.patch(
  "/:id/restore",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  depreciationIdValidator,
  validate,
  depreciationController.restore,
);

module.exports = router;

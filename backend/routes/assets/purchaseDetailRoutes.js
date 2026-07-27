const express = require("express");
const router = express.Router();

const purchaseDetailController = require("../../controllers/assets/purchaseDetailController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");

const {
  createPurchaseValidator,
  updatePurchaseValidator,
  purchaseIdValidator,
  listPurchaseValidator,
} = require("../../validators/purchaseDetailValidator");

// ======================================
// Create Purchase
// ======================================
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  createPurchaseValidator,
  validate,
  purchaseDetailController.create,
);

// ======================================
// Get All Purchases
// ======================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  listPurchaseValidator,
  validate,
  purchaseDetailController.getAll,
);

// ======================================
// Count
// ======================================
router.get(
  "/count",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  purchaseDetailController.count,
);

// ======================================
// Payment Summary
// ======================================
router.get(
  "/payment-summary",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  purchaseDetailController.paymentSummary,
);

// ======================================
// Total Purchase Cost
// ======================================
router.get(
  "/total-cost",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  purchaseDetailController.totalPurchaseCost,
);

// ======================================
// Get Purchase By ID
// ======================================
router.get(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  purchaseIdValidator,
  validate,
  purchaseDetailController.getById,
);

// ======================================
// Update Purchase
// ======================================
router.put(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  updatePurchaseValidator,
  validate,
  purchaseDetailController.update,
);

// ======================================
// Delete Purchase
// ======================================
router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  purchaseIdValidator,
  validate,
  purchaseDetailController.delete,
);

// ======================================
// Restore Purchase
// ======================================
router.patch(
  "/:id/restore",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  purchaseIdValidator,
  validate,
  purchaseDetailController.restore,
);

module.exports = router;

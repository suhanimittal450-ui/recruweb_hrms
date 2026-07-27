const express = require("express");
const router = express.Router();

const invoiceController = require("../../controllers/assets/invoiceController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const {
  uploadInvoiceValidator,
  replaceInvoiceValidator,
  invoiceIdValidator,
  purchaseDetailValidator,
  listInvoiceValidator,
  invoiceFileValidator,
} = require("../../validators/invoiceValidator");

// ======================================
// Upload Invoice
// ======================================
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  upload.single("invoice"),
  invoiceFileValidator,
  uploadInvoiceValidator,
  validate,
  invoiceController.upload,
);

// ======================================
// Get All Invoices
// ======================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  listInvoiceValidator,
  validate,
  invoiceController.getAll,
);

// ======================================
// Latest Uploads
// ======================================
router.get(
  "/latest",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  invoiceController.latest,
);

// ======================================
// Count
// ======================================
router.get(
  "/count",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  invoiceController.count,
);

// ======================================
// Get Invoice By Purchase Detail
// ======================================
router.get(
  "/purchase/:purchaseDetailId",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  purchaseDetailValidator,
  validate,
  invoiceController.getByPurchaseDetail,
);

// ======================================
// Get Invoice By ID
// ======================================
router.get(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  invoiceIdValidator,
  validate,
  invoiceController.getById,
);

// ======================================
// Replace Invoice
// ======================================
router.put(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  upload.single("invoice"),
  invoiceFileValidator,
  replaceInvoiceValidator,
  validate,
  invoiceController.replace,
);

// ======================================
// Delete Invoice
// ======================================
router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  invoiceIdValidator,
  validate,
  invoiceController.delete,
);

// ======================================
// Restore Invoice
// ======================================
router.patch(
  "/:id/restore",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  invoiceIdValidator,
  validate,
  invoiceController.restore,
);

module.exports = router;

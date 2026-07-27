const express = require("express");
const router = express.Router();

const reportController = require("../../controllers/reports/reportController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");

// ===================================================
// Create Report
// ===================================================
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  reportController.create,
);

// ===================================================
// Get All Reports
// ===================================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  reportController.getAll,
);

// ===================================================
// Latest Reports
// ===================================================
router.get(
  "/latest",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  reportController.latest,
);

// ===================================================
// Report Count
// ===================================================
router.get(
  "/count",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  reportController.count,
);

// ===================================================
// Analytics
// ===================================================
router.get(
  "/analytics",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  reportController.analytics,
);

// ===================================================
// Get Report By ID
// ===================================================
router.get(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  reportController.getById,
);
router.get(
  "/export",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  reportController.export,
);
// ===================================================
// Update Report
// ===================================================
router.put(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  reportController.update,
);
router.post(
  "/email",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  reportController.email,
);
// ===================================================
// Download Report
// ===================================================
router.patch(
  "/:id/download",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  reportController.download,
);

// ===================================================
// Delete Report
// ===================================================
router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  reportController.delete,
);

// ===================================================
// Restore Report
// ===================================================
router.patch(
  "/:id/restore",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  reportController.restore,
);

module.exports = router;

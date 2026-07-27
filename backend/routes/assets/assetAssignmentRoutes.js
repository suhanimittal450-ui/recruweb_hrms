const express = require("express");
const router = express.Router();

const assetAssignmentController = require("../../controllers/assets/assetAssignmentController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");
const activityLogger = require("../../middlewares/activityLogger");

const {
  createAssignmentValidator,
  returnAssignmentValidator,
  updateAssignmentValidator,
  assignmentIdValidator,
  listAssignmentValidator,
} = require("../../validators/assetAssignmentValidator");

// ======================================
// Assign Asset
// ======================================
activityLogger({
  entityType: "ASSET",
  action: "ASSIGNED",
  title: "Asset Assigned",
});
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  createAssignmentValidator,
  validate,
  assetAssignmentController.create,
);

// ======================================
// Get All Assignments
// ======================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  listAssignmentValidator,
  validate,
  assetAssignmentController.getAll,
);

// ======================================
// Assignment Count
// ======================================
router.get(
  "/count",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetAssignmentController.count,
);

// ======================================
// Overdue Assignments
// ======================================
router.get(
  "/overdue",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetAssignmentController.overdue,
);

// ======================================
// Get Assignment By Id
// ======================================
router.get(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assignmentIdValidator,
  validate,
  assetAssignmentController.getById,
);

// ======================================
// Update Assignment
// ======================================
router.put(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  updateAssignmentValidator,
  validate,
  assetAssignmentController.update,
);

// ======================================
// Return Asset
// ======================================
router.patch(
  "/:id/return",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  returnAssignmentValidator,
  validate,
  assetAssignmentController.returnAsset,
);

// ======================================
// Delete Assignment
// ======================================
router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  assignmentIdValidator,
  validate,
  assetAssignmentController.delete,
);

// ======================================
// Restore Assignment
// ======================================
router.patch(
  "/:id/restore",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  assignmentIdValidator,
  validate,
  assetAssignmentController.restore,
);

module.exports = router;

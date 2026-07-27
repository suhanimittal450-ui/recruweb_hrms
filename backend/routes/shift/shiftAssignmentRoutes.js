const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");

const shiftAssignmentController = require("../../controllers/shift/shiftAssignmentController");
const shiftAssignmentValidator = require("../../validators/shiftAssignmentValidator");

// -----------------------------
// Create Shift Assignment
// -----------------------------
router.post(
  "/",
  authMiddleware,
  authorize("ADMIN", "HR"),
  shiftAssignmentValidator.createAssignmentValidator,
  validate,
  shiftAssignmentController.createAssignment,
);

// -----------------------------
// Create Rotational Shift Schedule
// -----------------------------
router.post(
  "/rotate",
  authMiddleware,
  authorize("ADMIN", "HR"),
  shiftAssignmentValidator.rotationScheduleValidator,
  validate,
  shiftAssignmentController.createRotationSchedule,
);

// -----------------------------
// Shift Roster (who is on a shift on a given date)
// -----------------------------
router.get(
  "/roster",
  authMiddleware,
  shiftAssignmentValidator.rosterQueryValidator,
  validate,
  shiftAssignmentController.getRoster,
);

// -----------------------------
// Assignments For A Specific Employee
// -----------------------------
router.get(
  "/employee/:employeeId",
  authMiddleware,
  shiftAssignmentValidator.employeeIdParamValidator,
  validate,
  shiftAssignmentController.getAssignmentsByEmployee,
);

// -----------------------------
// Employee's Current Shift
// -----------------------------
router.get(
  "/employee/:employeeId/current",
  authMiddleware,
  shiftAssignmentValidator.employeeIdParamValidator,
  validate,
  shiftAssignmentController.getCurrentShift,
);

// -----------------------------
// Weekly Off Check For A Date
// -----------------------------
router.get(
  "/employee/:employeeId/weekly-off",
  authMiddleware,
  shiftAssignmentValidator.employeeIdParamValidator,
  validate,
  shiftAssignmentController.checkWeeklyOff,
);

// -----------------------------
// Get All / Create
// -----------------------------
router.get("/", authMiddleware, shiftAssignmentController.getAllAssignments);

router.get(
  "/:id",
  authMiddleware,
  shiftAssignmentValidator.assignmentIdValidator,
  validate,
  shiftAssignmentController.getAssignmentById,
);

router.put(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  shiftAssignmentValidator.assignmentIdValidator,
  validate,
  shiftAssignmentController.updateAssignment,
);

router.put(
  "/:id/end",
  authMiddleware,
  authorize("ADMIN", "HR"),
  shiftAssignmentValidator.endAssignmentValidator,
  validate,
  shiftAssignmentController.endAssignment,
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  shiftAssignmentValidator.assignmentIdValidator,
  validate,
  shiftAssignmentController.deleteAssignment,
);

module.exports = router;

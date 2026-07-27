const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");

const leaveController = require("../../controllers/leave/leaveController");
const activityLogger = require("../../middlewares/activityLogger");

// ----------------------
// Health Check
// ----------------------
router.get("/test", leaveController.test);

// ======================
// Employee Routes
// ======================

// Apply Leave
router.post(
  "/apply",
  authMiddleware,
  authorize("EMPLOYEE"),
  leaveController.applyLeave,
);

// My Leaves
router.get(
  "/my-leaves",
  authMiddleware,
  authorize("EMPLOYEE"),
  leaveController.myLeaves,
);

// Leave Balance
router.get(
  "/balance",
  authMiddleware,
  authorize("EMPLOYEE"),
  leaveController.leaveBalance,
);

// Cancel Leave
router.put(
  "/cancel/:id",
  authMiddleware,
  authorize("EMPLOYEE"),
  leaveController.cancelLeave,
);

// ======================
// Admin / HR Routes
// ======================

// Get All Leaves
router.get(
  "/all",
  authMiddleware,
  authorize("ADMIN", "HR"),
  leaveController.getAllLeaves,
);

// Approve Leave
activityLogger({
  entityType: "LEAVE",
  action: "APPROVED",
  title: "Leave Approved",
});

// Reject Leave
router.put(
  "/reject/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  leaveController.rejectLeave,
);
router.get(
  "/dashboard/employee",
  authMiddleware,
  leaveController.employeeDashboard,
);

router.get("/dashboard/hr", authMiddleware, leaveController.hrDashboard);
module.exports = router;

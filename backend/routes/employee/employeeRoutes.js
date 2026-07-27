const express = require("express");
const router = express.Router();
const auditLogger = require("../../middlewares/auditLogger");
const employeeController = require("../../controllers/employee/employeeController");
const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const uploadDocument = require("../../middlewares/uploadDocument");

// Create Employee
const activityLogger = require("../../middlewares/activityLogger");

router.post(
  "/",
  authMiddleware,
  // HR added alongside ADMIN — HR managing employee records is a normal
  // real-world permission and the frontend already assumes HR can do this.
  authorize("ADMIN", "HR"),
  activityLogger({
    entityType: "EMPLOYEE",
    action: "CREATE",
    title: "Employee Created",
  }),
  employeeController.createEmployee,
);
// Get All Employees
router.get("/", authMiddleware, employeeController.getAllEmployees);

// Get the logged-in user's own employee profile (must come before /:id)
router.get("/me", authMiddleware, employeeController.getMyEmployee);

// Pending documents queue for HR/Admin (must come before /:id routes)
router.get(
  "/documents/pending",
  authMiddleware,
  authorize("ADMIN", "HR"),
  employeeController.listPendingDocuments,
);

// Get Employee By ID
router.get("/:id", authMiddleware, employeeController.getEmployeeById);

// Update Employee
router.put("/:id", authMiddleware, employeeController.updateEmployee);

// Delete Employee
router.delete("/:id", authMiddleware, authorize("ADMIN", "HR"), employeeController.deleteEmployee);

// ------------------------------------------------------------------
// Documents — employee uploads their own, HR/Admin verify
// ------------------------------------------------------------------
router.post(
  "/:id/documents",
  authMiddleware,
  uploadDocument.single("file"),
  employeeController.uploadDocument,
);
router.get("/:id/documents", authMiddleware, employeeController.listDocuments);
router.patch(
  "/:id/documents/:documentId/verify",
  authMiddleware,
  authorize("ADMIN", "HR"),
  employeeController.verifyDocument,
);

// ------------------------------------------------------------------
// Onboarding checklist
// ------------------------------------------------------------------
router.get("/:id/onboarding", authMiddleware, employeeController.listOnboarding);
router.patch("/:id/onboarding/:stepId", authMiddleware, employeeController.toggleOnboardingStep);

module.exports = router;

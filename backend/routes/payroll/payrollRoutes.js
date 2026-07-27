const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");

const payrollController = require("../../controllers/payroll/payrollController");
const payrollValidator = require("../../validators/payrollValidator");
const activityLogger = require("../../middlewares/activityLogger");

router.post("/generate", authMiddleware, payrollController.generatePayroll);
activityLogger({
  entityType: "PAYROLL",
  action: "GENERATED",
  title: "Payroll Generated",
});
router.get("/", authMiddleware, payrollController.getAllPayrolls);

router.get("/:id", authMiddleware, payrollController.getPayrollById);

// =====================================
// PHASE 9.5.6 - PAYROLL APPROVAL WORKFLOW
// Draft(Pending) -> Processed -> Approved -> Paid -> Archived
// Only HR/Admin can process, approve, reject, pay, or archive
// =====================================

// Process Payroll (Draft -> Processed)
router.put(
  "/process/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  payrollValidator.remarksValidator,
  validate,
  payrollController.processPayroll,
);

// Approve Payroll (Processed -> Approved)
router.put(
  "/approve/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  payrollValidator.remarksValidator,
  validate,
  payrollController.approvePayroll,
);

// Reject Payroll (Processed/Approved -> Rejected)
router.put(
  "/reject/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  payrollValidator.rejectPayrollValidator,
  validate,
  payrollController.rejectPayroll,
);

// Mark Payroll Paid (Approved -> Paid)
router.put(
  "/pay/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  payrollValidator.remarksValidator,
  validate,
  payrollController.markAsPaid,
);

// Archive Payroll (Paid -> Archived)
router.put(
  "/archive/:id",
  authMiddleware,
  authorize("ADMIN", "HR"),
  payrollValidator.remarksValidator,
  validate,
  payrollController.archivePayroll,
);

// Payroll Timeline / Audit Trail
router.get(
  "/:id/timeline",
  authMiddleware,
  payrollValidator.payrollIdValidator,
  validate,
  payrollController.getPayrollTimeline,
);

module.exports = router;

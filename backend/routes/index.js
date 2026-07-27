const express = require("express");
const router = express.Router();

// ==============================
// Import Routes
// ==============================

const authRoutes = require("./auth/authRoutes");
const employeeRoutes = require("./employee/employeeRoutes");
const attendanceRoutes = require("./attendance/attendanceRoutes");
const leaveRoutes = require("./leave/leaveRoutes");
const holidayRoutes = require("./holiday/holidayRoutes");
const shiftRoutes = require("./shift/shiftRoutes");
const shiftAssignmentRoutes = require("./shift/shiftAssignmentRoutes");
const payrollRoutes = require("./payroll/payrollRoutes");
const organizationRoutes = require("./organization/organizationRoutes");

const candidateRoutes = require("./candidate/candidateRoutes");

const activityTimelineRoutes = require("./timeline/activityTimelineRoutes");

const globalSearchRoutes = require("./search/globalSearchRoutes");
const searchAnalyticsRoutes = require("./search/searchAnalyticsRoutes");

const dashboardRoutes = require("./analytics/dashboardRoutes");
const chartRoutes = require("./analytics/chartRoutes");
const kpiRoutes = require("./analytics/kpiRoutes");
const departmentAnalyticsRoutes = require("./analytics/departmentAnalyticsRoutes");
const recruitmentAnalyticsRoutes = require("./analytics/recruitmentAnalyticsRoutes");
const attendanceAnalyticsRoutes = require("./analytics/attendanceAnalyticsRoutes");
const payrollAnalyticsRoutes = require("./analytics/payrollAnalyticsRoutes");
const assetAnalyticsRoutes = require("./analytics/assetAnalyticsRoutes");
const finalDashboardRoutes = require("./analytics/finalDashboardRoutes");

const reportRoutes = require("./reports/reportRoutes");
const auditLogRoutes = require("./audit/auditLogRoutes");

const notificationRoutes = require("./notifications/notificationRoutes");

const assetCategoryRoutes = require("./assets/assetCategoryRoutes");
const assetRoutes = require("./assets/assetRoutes");
const vendorRoutes = require("./assets/vendorRoutes");
const warrantyRoutes = require("./assets/warrantyRoutes");
const barcodeRoutes = require("./assets/barcodeRoutes");
const qrCodeRoutes = require("./assets/qrCodeRoutes");
const invoiceRoutes = require("./assets/invoiceRoutes");
const purchaseDetailRoutes = require("./assets/purchaseDetailRoutes");
const assetAssignmentRoutes = require("./assets/assetAssignmentRoutes");
const assetMaintenanceRoutes = require("./assets/assetMaintenanceRoutes");
const assetReturnRoutes = require("./assets/assetReturnRoutes");
const assetHistoryRoutes = require("./assets/assetHistoryRoutes");
const assetDashboardRoutes = require("./assets/assetDashboardRoutes");

const taskRoutes = require("./task/taskRoutes");
const ticketRoutes = require("./helpdesk/ticketRoutes");

// ==============================
// Health Check
// ==============================

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "HRMS API Healthy",
    version: "v1",
    timestamp: new Date(),
  });
});

// ==============================
// Authentication
// ==============================

router.use("/auth", authRoutes);

// ==============================
// Employee Modules
// ==============================

router.use("/employees", employeeRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/leave", leaveRoutes);
router.use("/holidays", holidayRoutes);
router.use("/shifts", shiftRoutes);
router.use("/shift-assignment", shiftAssignmentRoutes);
router.use("/payroll", payrollRoutes);
router.use("/organization", organizationRoutes);
router.use("/tasks", taskRoutes);
router.use("/tickets", ticketRoutes);

// ==============================
// Recruitment
// ==============================

router.use("/candidates", candidateRoutes);
router.use("/jobs", require("./recruitment/jobRoutes"));
router.use("/interviews", require("./recruitment/interviewRoutes"));
router.use("/offers", require("./recruitment/offerRoutes"));

// ==============================
// Asset Management
// ==============================

router.use("/assets/categories", assetCategoryRoutes);
router.use("/assets", assetRoutes);
router.use("/vendors", vendorRoutes);
router.use("/warranties", warrantyRoutes);
router.use("/barcodes", barcodeRoutes);
router.use("/qrcodes", qrCodeRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/purchase-details", purchaseDetailRoutes);
router.use("/asset-assignments", assetAssignmentRoutes);
router.use("/asset-maintenance", assetMaintenanceRoutes);
router.use("/asset-returns", assetReturnRoutes);
router.use("/asset-history", assetHistoryRoutes);
router.use("/asset-dashboard", assetDashboardRoutes);

// ==============================
// Timeline
// ==============================

router.use("/timeline", activityTimelineRoutes);

// ==============================
// Search
// ==============================

router.use("/search", globalSearchRoutes);
router.use("/search-analytics", searchAnalyticsRoutes);

// ==============================
// Analytics
// ==============================

router.use("/dashboard", dashboardRoutes);
router.use("/charts", chartRoutes);
router.use("/kpis", kpiRoutes);

router.use("/department-analytics", departmentAnalyticsRoutes);
router.use("/recruitment-analytics", recruitmentAnalyticsRoutes);
router.use("/attendance-analytics", attendanceAnalyticsRoutes);
router.use("/payroll-analytics", payrollAnalyticsRoutes);
router.use("/asset-analytics", assetAnalyticsRoutes);

router.use("/enterprise-dashboard", finalDashboardRoutes);

// ==============================
// Reports
// ==============================

router.use("/reports", reportRoutes);

// ==============================
// Audit Logs
// ==============================

router.use("/audit-logs", auditLogRoutes);

// ==============================
// Notifications
// ==============================

router.use("/notifications", notificationRoutes);

// ==============================
// Export
// ==============================

module.exports = router;

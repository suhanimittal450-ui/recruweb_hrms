const express = require("express");
const router = express.Router();

const chartController = require("../../controllers/analytics/chartController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");

router.get(
  "/employees",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  chartController.employeeChart,
);

router.get(
  "/yearly",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  chartController.yearlyChart,
);

router.get(
  "/kpis",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  chartController.kpiChart,
);

router.get(
  "/dashboard",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  chartController.dashboardChart,
);

module.exports = router;

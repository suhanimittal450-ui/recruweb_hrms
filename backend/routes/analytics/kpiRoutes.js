const express = require("express");
const router = express.Router();

const controller = require("../../controllers/analytics/kpiController");

const auth = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");

router.get(
  "/",
  auth,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  controller.getKPIs,
);

module.exports = router;

const express = require("express");

const router = express.Router();

const auth = require("../../middlewares/authMiddleware");

const authorize = require("../../middlewares/authorize");

const controller = require("../../controllers/analytics/finalDashboardController");

router.get("/", auth, authorize("SUPER_ADMIN", "ADMIN"), controller.dashboard);

module.exports = router;

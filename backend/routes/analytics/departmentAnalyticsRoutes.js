const express = require("express");

const router = express.Router();

const auth = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");

const controller = require("../../controllers/analytics/departmentAnalyticsController");

router.get("/", auth, authorize("SUPER_ADMIN", "ADMIN"), controller.analytics);

module.exports = router;

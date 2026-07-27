const express = require("express");

const router = express.Router();

const controller = require("../../controllers/search/searchAnalyticsController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");

router.get(
  "/dashboard",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  controller.dashboard,
);

router.get(
  "/daily",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  controller.daily,
);

router.get(
  "/monthly",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  controller.monthly,
);

module.exports = router;

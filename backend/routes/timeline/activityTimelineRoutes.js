const express = require("express");
const router = express.Router();

const controller = require("../../controllers/timeline/activityTimelineController");

const auth = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");

router.get(
  "/latest",
  auth,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  controller.latest,
);

router.get(
  "/:entityType/:entityId",
  auth,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  controller.getTimeline,
);

module.exports = router;

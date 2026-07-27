const express = require("express");
const router = express.Router();

const controller = require("../../controllers/audit/auditLogController");

const auth = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");

router.get("/", auth, authorize("SUPER_ADMIN", "ADMIN"), controller.getAll);

router.get(
  "/latest",
  auth,
  authorize("SUPER_ADMIN", "ADMIN"),
  controller.latest,
);

router.get(
  "/analytics",
  auth,
  authorize("SUPER_ADMIN", "ADMIN"),
  controller.analytics,
);

router.get("/:id", auth, authorize("SUPER_ADMIN", "ADMIN"), controller.getById);

module.exports = router;

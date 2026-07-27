const express = require("express");
const router = express.Router();

const notificationController = require("../../controllers/notifications/notificationController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");

// ===========================================
// Create Notification
// ===========================================
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  notificationController.create,
);

// ===========================================
// Broadcast Notification
// ===========================================
router.post(
  "/broadcast",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  notificationController.broadcast,
);

// ===========================================
// Get My Notifications
// ===========================================
router.get("/my", authMiddleware, notificationController.getMyNotifications);

// ===========================================
// Latest Notifications
// ===========================================
router.get("/latest", authMiddleware, notificationController.latest);

// ===========================================
// Unread Count
// ===========================================
router.get("/unread-count", authMiddleware, notificationController.unreadCount);

// ===========================================
// Analytics
// ===========================================
router.get(
  "/analytics",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  notificationController.analytics,
);

// ===========================================
// Mark All Read
// ===========================================
router.patch(
  "/mark-all-read",
  authMiddleware,
  notificationController.markAllRead,
);

// ===========================================
// Get All Notifications
// ===========================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  notificationController.getAll,
);

// ===========================================
// Get By ID
// ===========================================
router.get("/:id", authMiddleware, notificationController.getById);

// ===========================================
// Mark Read
// ===========================================
router.patch("/:id/read", authMiddleware, notificationController.markRead);

// ===========================================
// Archive
// ===========================================
router.patch("/:id/archive", authMiddleware, notificationController.archive);

// ===========================================
// Restore
// ===========================================
router.patch("/:id/restore", authMiddleware, notificationController.restore);

// ===========================================
// Delete
// ===========================================
router.delete("/:id", authMiddleware, notificationController.delete);

module.exports = router;

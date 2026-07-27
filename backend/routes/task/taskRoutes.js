const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const validate = require("../../middlewares/validate");
const activityLogger = require("../../middlewares/activityLogger");
const uploadDocument = require("../../middlewares/uploadDocument");

const taskController = require("../../controllers/task/taskController");
const {
  createTaskValidator,
  updateStatusValidator,
  addCommentValidator,
} = require("../../validators/taskValidator");

// ------------------------------------------------------------------
// Create Task — HR / Manager / Admin assign tasks to employees
// ------------------------------------------------------------------
router.post(
  "/",
  authMiddleware,
  authorize("ADMIN", "HR", "MANAGER"),
  createTaskValidator,
  validate,
  activityLogger({ entityType: "TASK", action: "CREATE", title: "Task Created" }),
  taskController.createTask,
);

// All tasks (Admin/HR/Manager view with filters)
router.get(
  "/",
  authMiddleware,
  authorize("ADMIN", "HR", "MANAGER"),
  taskController.getAllTasks,
);

// Logged-in employee's own tasks (must come before /:id)
router.get("/my-tasks", authMiddleware, taskController.getMyTasks);

// Task stats widget for dashboard (must come before /:id)
router.get(
  "/stats/:employeeId?",
  authMiddleware,
  taskController.getTaskStats,
);

// Single Task
router.get("/:id", authMiddleware, taskController.getTaskById);

// Update Task
router.put(
  "/:id",
  authMiddleware,
  activityLogger({ entityType: "TASK", action: "UPDATE", title: "Task Updated" }),
  taskController.updateTask,
);

// Kanban drag/drop status update
router.patch(
  "/:id/status",
  authMiddleware,
  updateStatusValidator,
  validate,
  taskController.updateStatus,
);

// Delete (archive) Task
router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "HR", "MANAGER"),
  taskController.deleteTask,
);

// Comments
router.post(
  "/:id/comments",
  authMiddleware,
  addCommentValidator,
  validate,
  taskController.addComment,
);

// Attachments
router.post(
  "/:id/attachments",
  authMiddleware,
  uploadDocument.single("file"),
  taskController.uploadAttachment,
);

module.exports = router;

const asyncHandler = require("../../middlewares/asyncHandler");
const taskService = require("../../services/task/taskService");

// Create Task
exports.createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.body, req.user._id || req.user.id);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

// Get All Tasks (Admin/HR/Manager view)
exports.getAllTasks = asyncHandler(async (req, res) => {
  const result = await taskService.getAllTasks(req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

// Get Logged-in User's Tasks
exports.getMyTasks = asyncHandler(async (req, res) => {
  const employeeId =
    req.query.employeeId || (await taskService.resolveEmployeeId(req.user._id || req.user.id));

  const result = await taskService.getMyTasks(employeeId, req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

// Get Task By ID
exports.getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id);

  res.status(200).json({
    success: true,
    data: task,
  });
});

// Update Task
exports.updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});

// Update Task Status only (used for Kanban drag/drop)
exports.updateStatus = asyncHandler(async (req, res) => {
  const task = await taskService.updateStatus(req.params.id, req.body.status);

  res.status(200).json({
    success: true,
    message: "Task status updated",
    data: task,
  });
});

// Delete (archive) Task
exports.deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

// Add Comment
exports.addComment = asyncHandler(async (req, res) => {
  const task = await taskService.addComment(req.params.id, req.body.text, req.user._id || req.user.id);

  res.status(200).json({
    success: true,
    message: "Comment added",
    data: task,
  });
});

// Upload Attachment
exports.uploadAttachment = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const task = await taskService.addAttachment(req.params.id, req.file.path || req.file.url, req.file.originalname);

  res.status(200).json({
    success: true,
    message: "Attachment uploaded",
    data: task,
  });
});

// Task Stats for an employee (dashboard widget)
exports.getTaskStats = asyncHandler(async (req, res) => {
  const employeeId =
    req.params.employeeId || (await taskService.resolveEmployeeId(req.user._id || req.user.id));

  const stats = await taskService.getTaskStats(employeeId);

  res.status(200).json({
    success: true,
    data: stats,
  });
});

const { body } = require("express-validator");

const createTaskValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("assignedTo").notEmpty().withMessage("assignedTo (Employee ID) is required"),
  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High", "Urgent"])
    .withMessage("Invalid priority"),
  body("dueDate").optional().isISO8601().withMessage("dueDate must be a valid date"),
];

const updateStatusValidator = [
  body("status")
    .isIn(["ToDo", "InProgress", "Review", "Done", "Cancelled"])
    .withMessage("Invalid status"),
];

const addCommentValidator = [
  body("text").notEmpty().withMessage("Comment text is required"),
];

module.exports = {
  createTaskValidator,
  updateStatusValidator,
  addCommentValidator,
};

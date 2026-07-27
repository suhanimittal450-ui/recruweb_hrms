const { body } = require("express-validator");

const createTicketValidator = [
  body("subject").notEmpty().withMessage("Subject is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("category")
    .optional()
    .isIn(["IT", "HR", "Finance", "Facilities", "Payroll", "Other"])
    .withMessage("Invalid category"),
  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High", "Urgent"])
    .withMessage("Invalid priority"),
];

const assignTicketValidator = [
  body("assignedTo").notEmpty().withMessage("assignedTo (Employee ID) is required"),
];

const replyValidator = [
  body("text").notEmpty().withMessage("Reply text is required"),
];

module.exports = {
  createTicketValidator,
  assignTicketValidator,
  replyValidator,
};

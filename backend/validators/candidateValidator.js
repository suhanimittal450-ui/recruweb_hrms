const { body } = require("express-validator");

exports.createCandidateValidator = [
  body("firstName").trim().notEmpty().withMessage("First Name is required"),

  body("email").isEmail().withMessage("Valid email is required"),

  body("phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone must be 10 digits"),

  body("status")
    .optional()
    .isIn([
      "Applied",
      "HR Review",
      "Interview Scheduled",
      "Interview Cleared",
      "Manager Approved",
      "Offer Sent",
      "Offer Accepted",
      "Joining Pending",
      "Joined",
      "Rejected",
    ])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority"),
];

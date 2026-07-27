const { body } = require("express-validator");

const registerValidator = [
  body("firstName").notEmpty().withMessage("First Name is required"),

  body("email").isEmail().withMessage("Valid Email Required"),

  body("phone").notEmpty().withMessage("Phone Required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password minimum 8 characters"),
];

module.exports = {
  registerValidator,
};

const { body, param, query } = require("express-validator");

const DAY_ENUM = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const createAssignmentValidator = [
  body("employee").isMongoId().withMessage("Valid employee id is required"),
  body("shift").isMongoId().withMessage("Valid shift id is required"),
  body("effectiveFrom")
    .notEmpty()
    .withMessage("effectiveFrom is required")
    .isISO8601()
    .withMessage("effectiveFrom must be a valid date"),
  body("effectiveTo")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("effectiveTo must be a valid date"),
  body("weeklyOffDays")
    .optional()
    .isArray()
    .withMessage("weeklyOffDays must be an array")
    .custom((days) => days.every((d) => DAY_ENUM.includes(d)))
    .withMessage("weeklyOffDays contains an invalid day name"),
];

const rotationScheduleValidator = [
  body("employee").isMongoId().withMessage("Valid employee id is required"),
  body("segments")
    .isArray({ min: 2 })
    .withMessage("At least two rotation segments are required"),
  body("segments.*.shift")
    .isMongoId()
    .withMessage("Each segment requires a valid shift id"),
  body("segments.*.effectiveFrom")
    .notEmpty()
    .withMessage("Each segment requires an effectiveFrom date")
    .isISO8601(),
];

const assignmentIdValidator = [
  param("id").isMongoId().withMessage("Valid assignment id is required"),
];

const employeeIdParamValidator = [
  param("employeeId").isMongoId().withMessage("Valid employee id is required"),
];

const rosterQueryValidator = [
  query("shiftId").isMongoId().withMessage("Valid shift id is required"),
];

const endAssignmentValidator = [
  ...assignmentIdValidator,
  body("effectiveTo")
    .optional()
    .isISO8601()
    .withMessage("effectiveTo must be a valid date"),
];

module.exports = {
  createAssignmentValidator,
  rotationScheduleValidator,
  assignmentIdValidator,
  employeeIdParamValidator,
  rosterQueryValidator,
  endAssignmentValidator,
};

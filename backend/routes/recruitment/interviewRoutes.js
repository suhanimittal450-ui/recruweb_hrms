const express = require("express");
const router = express.Router();

const interviewController = require("../../controllers/recruitment/interviewController");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/", authMiddleware, interviewController.createInterview);
router.get("/", authMiddleware, interviewController.getInterviews);

module.exports = router;

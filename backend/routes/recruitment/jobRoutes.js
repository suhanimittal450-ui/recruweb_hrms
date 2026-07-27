const express = require("express");
const router = express.Router();

const jobController = require("../../controllers/recruitment/jobController");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/", authMiddleware, jobController.createJob);
router.get("/", authMiddleware, jobController.getJobs);

module.exports = router;

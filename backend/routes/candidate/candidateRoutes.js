const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const {
  createCandidateValidator,
} = require("../../validators/candidateValidator");

const candidateController = require("../../controllers/candidate/candidateController");
const authMiddleware = require("../../middlewares/authMiddleware");

// Create Candidate
router.post(
  "/",
  authMiddleware,
  createCandidateValidator,
  validate,
  candidateController.createCandidate,
);

// Get All Candidates
router.get("/", authMiddleware, candidateController.getAllCandidates);

// Get Candidate By ID
router.get("/:id", authMiddleware, candidateController.getCandidateById);

// Update Candidate
router.put("/:id", authMiddleware, candidateController.updateCandidate);

// Delete Candidate
router.delete("/:id", authMiddleware, candidateController.deleteCandidate);

module.exports = router;

const asyncHandler = require("../../middlewares/asyncHandler");
const candidateService = require("../../services/candidate/candidateService");

// Create Candidate
exports.createCandidate = asyncHandler(async (req, res) => {
  const candidate = await candidateService.createCandidate(req.body);

  res.status(201).json({
    success: true,
    message: "Candidate created successfully",
    data: candidate,
  });
});

// Get All Candidates
exports.getAllCandidates = asyncHandler(async (req, res) => {
  const result = await candidateService.getAllCandidates(req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

// Get Candidate By ID
exports.getCandidateById = asyncHandler(async (req, res) => {
  const candidate = await candidateService.getCandidateById(req.params.id);

  res.status(200).json({
    success: true,
    data: candidate,
  });
});

// Update Candidate
exports.updateCandidate = asyncHandler(async (req, res) => {
  const candidate = await candidateService.updateCandidate(
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Candidate updated successfully",
    data: candidate,
  });
});

// Delete Candidate
exports.deleteCandidate = asyncHandler(async (req, res) => {
  await candidateService.deleteCandidate(req.params.id);

  res.status(200).json({
    success: true,
    message: "Candidate deleted successfully",
  });
});

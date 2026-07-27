const asyncHandler = require("../../middlewares/asyncHandler");
const interviewService = require("../../services/recruitment/interviewService");

exports.createInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.createInterview(req.body);

  res.status(201).json({
    success: true,
    data: interview,
  });
});

exports.getInterviews = asyncHandler(async (req, res) => {
  const interviews = await interviewService.getInterviews();

  res.json({
    success: true,
    data: interviews,
  });
});

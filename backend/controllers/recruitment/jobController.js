const asyncHandler = require("../../middlewares/asyncHandler");
const jobService = require("../../services/recruitment/jobService");

exports.createJob = asyncHandler(async (req, res) => {
  const job = await jobService.createJob(req.body);

  res.status(201).json({
    success: true,
    data: job,
  });
});

exports.getJobs = asyncHandler(async (req, res) => {
  const jobs = await jobService.getJobs();

  res.json({
    success: true,
    data: jobs,
  });
});

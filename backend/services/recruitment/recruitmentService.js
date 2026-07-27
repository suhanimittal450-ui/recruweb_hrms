const Job = require("../../models/recruitment/Job");
const Candidate = require("../../models/candidate/Candidate");

class RecruitmentService {
  async dashboard() {
    const jobs = await Job.countDocuments();

    const candidates = await Candidate.countDocuments();

    const inReview = await Candidate.countDocuments({
      status: "HR Review",
    });

    const inInterview = await Candidate.countDocuments({
      status: "Interview Scheduled",
    });

    const offered = await Candidate.countDocuments({
      status: "Offer Sent",
    });

    const joined = await Candidate.countDocuments({
      status: "Joined",
    });

    return {
      jobs,
      candidates,
      inReview,
      inInterview,
      offered,
      joined,
    };
  }
}

module.exports = new RecruitmentService();

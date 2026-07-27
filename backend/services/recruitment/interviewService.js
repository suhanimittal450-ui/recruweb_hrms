const interviewRepository = require("../../repositories/recruitment/interviewRepository");

class InterviewService {
  createInterview(data) {
    return interviewRepository.create(data);
  }

  getInterviews() {
    return interviewRepository.findAll();
  }

  getInterview(id) {
    return interviewRepository.findById(id);
  }

  updateInterview(id, data) {
    return interviewRepository.update(id, data);
  }

  deleteInterview(id) {
    return interviewRepository.delete(id);
  }
}

module.exports = new InterviewService();

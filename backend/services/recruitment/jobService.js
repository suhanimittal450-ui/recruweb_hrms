const jobRepository = require("../../repositories/recruitment/jobRepository");

class JobService {
  createJob(data) {
    return jobRepository.create(data);
  }

  getJobs() {
    return jobRepository.findAll();
  }

  getJob(id) {
    return jobRepository.findById(id);
  }

  updateJob(id, data) {
    return jobRepository.update(id, data);
  }

  deleteJob(id) {
    return jobRepository.delete(id);
  }
}

module.exports = new JobService();

const Job = require("../../models/recruitment/Job");

class JobRepository {
  create(data) {
    return Job.create(data);
  }

  findAll() {
    return Job.find().populate("department").populate("designation");
  }

  findById(id) {
    return Job.findById(id);
  }

  update(id, data) {
    return Job.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
  }

  delete(id) {
    return Job.findByIdAndDelete(id);
  }
}

module.exports = new JobRepository();

const Interview = require("../../models/recruitment/Interview");

class InterviewRepository {
  create(data) {
    return Interview.create(data);
  }

  findAll() {
    return Interview.find().populate("candidate").populate("interviewer");
  }

  findById(id) {
    return Interview.findById(id).populate("candidate").populate("interviewer");
  }

  update(id, data) {
    return Interview.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
  }

  delete(id) {
    return Interview.findByIdAndDelete(id);
  }
}

module.exports = new InterviewRepository();

const Candidate = require("../../models/candidate/Candidate");

class CandidateRepository {
  async create(data) {
    return await Candidate.create(data);
  }

  async findAll(filter = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
      search = "",
    } = options;

    const skip = (page - 1) * limit;

    // Search by Name / Email / Candidate ID
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { candidateId: { $regex: search, $options: "i" } },
      ];
    }

    const sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    const candidates = await Candidate.find(filter)
      .populate("department")
      .populate("designation")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Candidate.countDocuments(filter);

    return {
      candidates,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findById(id) {
    return await Candidate.findById(id)
      .populate("department")
      .populate("designation");
  }

  async update(id, data) {
    return await Candidate.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }
  async findByCandidateId(id) {
    return await Candidate.findById(id)
      .populate("department")
      .populate("designation")
      .populate("branch");
  }
  // NEW
  async findOne(filter) {
    return await Candidate.findOne(filter)
      .populate("department")
      .populate("designation")
      .populate("branch");
  }
  async delete(id) {
    return await Candidate.findByIdAndDelete(id);
  }
}

module.exports = new CandidateRepository();

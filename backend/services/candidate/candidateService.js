const candidateRepository = require("../../repositories/candidate/candidateRepository");

class CandidateService {
  async createCandidate(data) {
    const existingCandidates = await candidateRepository.findAll(
      {
        email: data.email,
      },
      {
        page: 1,
        limit: 1,
      },
    );

    if (existingCandidates.total > 0) {
      throw new Error("Candidate with this email already exists.");
    }

    // Generate Candidate ID
    const random = Math.floor(100000 + Math.random() * 900000);
    data.candidateId = `CAND-${random}`;

    data.timeline = [
      {
        action: "Candidate Applied",
        by: data.createdBy || null,
        date: new Date(),
      },
    ];

    return await candidateRepository.create(data);
  }

  async getAllCandidates(query) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const filter = {};

    // Filters
    if (query.status) {
      filter.status = query.status;
    }

    if (query.source) {
      filter.source = query.source;
    }

    if (query.priority) {
      filter.priority = query.priority;
    }

    if (query.email) {
      filter.email = {
        $regex: query.email,
        $options: "i",
      };
    }

    return await candidateRepository.findAll(filter, {
      page,
      limit,
      search: query.search || "",
      sortBy: query.sortBy || "createdAt",
      order: query.order || "desc",
    });
  }

  async getCandidateById(id) {
    const candidate = await candidateRepository.findById(id);

    if (!candidate) {
      throw new Error("Candidate not found");
    }

    return candidate;
  }

  async updateCandidate(id, data) {
    const candidate = await candidateRepository.update(id, data);

    if (!candidate) {
      throw new Error("Candidate not found");
    }

    return candidate;
  }

  async deleteCandidate(id) {
    const candidate = await candidateRepository.delete(id);

    if (!candidate) {
      throw new Error("Candidate not found");
    }

    return true;
  }
}

module.exports = new CandidateService();

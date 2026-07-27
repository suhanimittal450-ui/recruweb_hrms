const repository = require("../../repositories/audit/auditLogRepository");

class AuditLogService {
  async create(data) {
    return repository.create(data);
  }

  async getAll(filter) {
    return repository.findAll(filter);
  }

  async getById(id) {
    const log = await repository.findById(id);

    if (!log) {
      throw new Error("Audit log not found.");
    }

    return log;
  }

  async latest(limit) {
    return repository.latest(limit);
  }

  async analytics() {
    return repository.analytics();
  }

  async count(filter) {
    return repository.count(filter);
  }
}

module.exports = new AuditLogService();

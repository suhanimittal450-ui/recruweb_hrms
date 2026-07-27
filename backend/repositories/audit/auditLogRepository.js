const AuditLog = require("../../models/audit/auditLogModel");

class AuditLogRepository {
  async create(data) {
    return AuditLog.create(data);
  }

  async findById(id) {
    return AuditLog.findById(id).populate("user", "firstName lastName email");
  }

  async findAll(filter = {}) {
    return AuditLog.find(filter)
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1 });
  }

  async count(filter = {}) {
    return AuditLog.countDocuments(filter);
  }

  async latest(limit = 20) {
    return AuditLog.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("user", "firstName lastName");
  }

  async analytics() {
    return AuditLog.aggregate([
      {
        $group: {
          _id: "$module",
          total: {
            $sum: 1,
          },
        },
      },
    ]);
  }
}

module.exports = new AuditLogRepository();

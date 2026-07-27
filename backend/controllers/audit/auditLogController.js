const auditService = require("../../services/audit/auditLogService");

class AuditLogController {
  async getAll(req, res, next) {
    try {
      const logs = await auditService.getAll(req.query);

      res.json({
        success: true,
        data: logs,
      });
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const log = await auditService.getById(req.params.id);

      res.json({
        success: true,
        data: log,
      });
    } catch (err) {
      next(err);
    }
  }

  async latest(req, res, next) {
    try {
      const logs = await auditService.latest(req.query.limit || 20);

      res.json({
        success: true,
        data: logs,
      });
    } catch (err) {
      next(err);
    }
  }

  async analytics(req, res, next) {
    try {
      const analytics = await auditService.analytics();

      res.json({
        success: true,
        data: analytics,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuditLogController();

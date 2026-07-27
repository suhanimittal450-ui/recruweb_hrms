const auditLogService = require("../services/audit/auditLogService");

const auditLogger = (moduleName) => {
  return (req, res, next) => {
    const start = Date.now();

    const originalJson = res.json.bind(res);

    res.json = async (body) => {
      try {
        await auditLogService.create({
          user: req.user?._id || req.user?.id || null,

          module: moduleName,

          action: req.method,

          entityId: req.params.id || null,

          entityName: moduleName,

          oldData: {},

          newData: req.body || {},

          ipAddress: req.ip || req.headers["x-forwarded-for"],

          method: req.method,

          endpoint: req.originalUrl,

          browser: req.headers["user-agent"],

          device: req.headers["sec-ch-ua-mobile"] || "Desktop",

          os: req.headers["sec-ch-ua-platform"] || "Unknown",

          statusCode: res.statusCode,

          responseTime: Date.now() - start,

          success: body?.success ?? true,

          remarks: body?.message || "",

          metadata: {},
        });
      } catch (err) {
        console.error("Audit Logger:", err.message);
      }

      return originalJson(body);
    };

    next();
  };
};

module.exports = auditLogger;

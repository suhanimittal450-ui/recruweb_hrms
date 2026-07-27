const activityTimelineService = require("../services/timeline/activityTimelineService");

const activityLogger = ({ entityType, action, title }) => {
  return (req, res, next) => {
    const originalJson = res.json.bind(res);

    res.json = async (body) => {
      try {
        if (body?.success) {
          await activityTimelineService.create({
            entityType,

            entityId: body?.data?._id || body?.data?.id || req.params.id,

            title,

            description: body?.message || "",

            action,

            performedBy: req.user?._id || req.user?.id,

            metadata: {
              endpoint: req.originalUrl,
              method: req.method,
              ip: req.ip,
            },
          });
        }
      } catch (err) {
        console.error("Activity Logger:", err.message);
      }

      return originalJson(body);
    };

    next();
  };
};

module.exports = activityLogger;

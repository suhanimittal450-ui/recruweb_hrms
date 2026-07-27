const timelineService = require("../../services/timeline/activityTimelineService");

class ActivityTimelineController {
  async getTimeline(req, res, next) {
    try {
      const { entityType, entityId } = req.params;

      const data = await timelineService.getTimeline(entityType, entityId);

      res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async latest(req, res, next) {
    try {
      const data = await timelineService.latest(req.query.limit || 20);

      res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ActivityTimelineController();

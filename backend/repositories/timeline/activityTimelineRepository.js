const ActivityTimeline = require("../../models/timeline/activityTimelineModel");

class ActivityTimelineRepository {
  async create(data) {
    return ActivityTimeline.create(data);
  }

  async findByEntity(entityType, entityId) {
    return ActivityTimeline.find({
      entityType,
      entityId,
      isVisible: true,
    })
      .populate("performedBy", "firstName lastName email")
      .sort({ createdAt: -1 });
  }

  async latest(limit = 20) {
    return ActivityTimeline.find()
      .populate("performedBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  async delete(id) {
    return ActivityTimeline.findByIdAndDelete(id);
  }

  async count(filter = {}) {
    return ActivityTimeline.countDocuments(filter);
  }
}

module.exports = new ActivityTimelineRepository();

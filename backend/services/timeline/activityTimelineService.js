const repository = require("../../repositories/timeline/activityTimelineRepository");

class ActivityTimelineService {
  async create(data) {
    return repository.create(data);
  }

  async getTimeline(entityType, entityId) {
    return repository.findByEntity(entityType, entityId);
  }

  async latest(limit) {
    return repository.latest(limit);
  }

  async count(filter) {
    return repository.count(filter);
  }

  async delete(id) {
    return repository.delete(id);
  }
}

module.exports = new ActivityTimelineService();

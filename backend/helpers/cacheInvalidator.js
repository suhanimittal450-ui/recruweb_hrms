const cacheService = require("../services/cache/cacheService");

class CacheInvalidator {
  async employee(id) {
    await cacheService.del(`employee:${id}`);
    await cacheService.del("employees:list");
    await cacheService.del("dashboard:overview");
  }

  async asset(id) {
    await cacheService.del(`asset:${id}`);
    await cacheService.del("assets:list");
    await cacheService.del("dashboard:overview");
  }

  async attendance() {
    await cacheService.del("attendance:today");
    await cacheService.del("attendance:monthly");
    await cacheService.del("dashboard:overview");
  }

  async payroll() {
    await cacheService.del("payroll:list");
    await cacheService.del("dashboard:overview");
  }

  async search(query) {
    await cacheService.del(`search:${query}`);
  }

  async dashboard() {
    await cacheService.del("dashboard:overview");
    await cacheService.del("dashboard:kpis");
    await cacheService.del("dashboard:summary");
  }

  async all() {
    await cacheService.flush();
  }
}

module.exports = new CacheInvalidator();

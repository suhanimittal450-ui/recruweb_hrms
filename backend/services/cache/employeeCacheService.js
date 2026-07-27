const cacheService = require("./cacheService");

class EmployeeCacheService {
  getKey(id) {
    return `employee:${id}`;
  }

  async get(id) {
    return await cacheService.get(this.getKey(id));
  }

  async set(id, employee) {
    await cacheService.set(this.getKey(id), employee, 600);
  }

  async clear(id) {
    await cacheService.del(this.getKey(id));
  }

  async clearList() {
    await cacheService.del("employees:list");
  }
}

module.exports = new EmployeeCacheService();

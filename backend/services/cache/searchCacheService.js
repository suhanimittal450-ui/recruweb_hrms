const cacheService = require("./cacheService");

class SearchCacheService {
  key(query) {
    return `search:${query}`;
  }

  async get(query) {
    return await cacheService.get(this.key(query));
  }

  async set(query, data) {
    await cacheService.set(this.key(query), data, 300);
  }

  async clear(query) {
    await cacheService.del(this.key(query));
  }
}

module.exports = new SearchCacheService();

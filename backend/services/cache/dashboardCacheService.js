const cacheService = require("./cacheService");
const dashboardService = require("../analytics/dashboardService");

class DashboardCacheService {
  constructor() {
    this.KEY = "dashboard:overview";
    this.TTL = 300; // 5 Minutes
  }

  // =====================================
  // Get Dashboard
  // =====================================
  async getDashboard() {
    const cache = await cacheService.get(this.KEY);

    if (cache) {
      return {
        cache: true,
        data: cache,
      };
    }

    const data = await dashboardService.getDashboard();

    await cacheService.set(this.KEY, data, this.TTL);

    return {
      cache: false,
      data,
    };
  }

  // =====================================
  // Refresh Dashboard Cache
  // =====================================
  async refresh() {
    const data = await dashboardService.getDashboard();

    await cacheService.set(this.KEY, data, this.TTL);

    return data;
  }

  // =====================================
  // Delete Dashboard Cache
  // =====================================
  async clear() {
    await cacheService.del(this.KEY);
  }

  // =====================================
  // Warm Cache
  // =====================================
  async warmup() {
    console.log("🔥 Warming Dashboard Cache...");

    await this.refresh();

    console.log("✅ Dashboard Cache Warmed");
  }
}

module.exports = new DashboardCacheService();

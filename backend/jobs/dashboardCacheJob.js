const cron = require("node-cron");
const dashboardService = require("../services/analytics/dashboardService");

class DashboardCacheJob {
  constructor() {
    this.cache = {
      dashboard: null,
      updatedAt: null,
    };
  }

  // =====================================
  // Refresh Dashboard Cache
  // =====================================
  async refresh() {
    try {
      console.log("🔄 Refreshing Dashboard Cache...");

      this.cache.dashboard = await dashboardService.getDashboard();
      this.cache.updatedAt = new Date();

      console.log("✅ Dashboard Cache Updated");
    } catch (error) {
      console.error("Dashboard Cache Error:", error.message);
    }
  }

  // =====================================
  // Get Cached Data
  // =====================================
  getCache() {
    return this.cache;
  }

  // =====================================
  // Start Scheduler
  // =====================================
  start() {
    // Every 5 minutes
    cron.schedule("*/5 * * * *", async () => {
      await this.refresh();
    });

    // Initial Refresh
    this.refresh();

    console.log("📊 Dashboard Cache Scheduler Started");
  }
}

module.exports = new DashboardCacheJob();

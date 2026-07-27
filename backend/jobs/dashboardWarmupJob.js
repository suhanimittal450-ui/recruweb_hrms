const cron = require("node-cron");

const dashboardCacheService = require("../services/cache/dashboardCacheService");

class DashboardWarmupJob {
  start() {
    console.log("📊 Dashboard Warmup Started");

    dashboardCacheService.warmup();

    cron.schedule("*/5 * * * *", async () => {
      await dashboardCacheService.refresh();

      console.log("♻ Dashboard Cache Refreshed");
    });
  }
}

module.exports = new DashboardWarmupJob();

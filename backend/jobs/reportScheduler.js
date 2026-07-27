const cron = require("node-cron");

const reportService = require("../services/reports/reportService");

class ReportScheduler {
  start() {
    console.log("📅 Report Scheduler Started");

    // =====================================================
    // Daily Report (Every day at 08:00 AM)
    // =====================================================
    cron.schedule("0 8 * * *", async () => {
      try {
        console.log("Generating Daily Asset Report...");

        await reportService.emailReport({
          emails: [process.env.ADMIN_EMAIL],
          type: "ASSET",
          format: "PDF",
        });

        console.log("✅ Daily Asset Report Sent");
      } catch (error) {
        console.error("Daily Report Error:", error.message);
      }
    });

    // =====================================================
    // Weekly Report (Monday 09:00 AM)
    // =====================================================
    cron.schedule("0 9 * * 1", async () => {
      try {
        console.log("Generating Weekly Asset Report...");

        await reportService.emailReport({
          emails: [process.env.ADMIN_EMAIL],
          type: "ASSET",
          format: "EXCEL",
        });

        console.log("✅ Weekly Report Sent");
      } catch (error) {
        console.error("Weekly Report Error:", error.message);
      }
    });

    // =====================================================
    // Monthly Report (1st Day 10 AM)
    // =====================================================
    cron.schedule("0 10 1 * *", async () => {
      try {
        console.log("Generating Monthly Asset Report...");

        await reportService.emailReport({
          emails: [process.env.ADMIN_EMAIL],
          type: "ASSET",
          format: "PDF",
        });

        console.log("✅ Monthly Report Sent");
      } catch (error) {
        console.error("Monthly Report Error:", error.message);
      }
    });
  }
}

module.exports = new ReportScheduler();

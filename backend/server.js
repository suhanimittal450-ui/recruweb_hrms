const dotenv = require("dotenv");
dotenv.config();

const http = require("http");

const app = require("./app");
const connectDB = require("./config/db");
const logger = require("./config/logger");
const reportScheduler = require("./jobs/reportScheduler");
const dashboardWarmupJob = require("./jobs/dashboardWarmupJob");
const initializeSocket = require("./socket");

// ==============================
// Register All Models
// ==============================
require("./models");

// ==============================
// Connect Database
// ==============================
connectDB();

// ==============================
// Create HTTP Server
// ==============================
const server = http.createServer(app);

// ==============================
// Initialize Socket.IO
// ==============================
const io = initializeSocket(server);
app.set("io", io);

// ==============================
// Start Background Jobs
// ==============================
reportScheduler.start();

// ==============================
// Start Server
// ==============================
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () => {
  logger.info(`🚀 Server Running On ${HOST}:${PORT}`);

  dashboardWarmupJob.start();
});

// ==============================
// Unhandled Promise Rejection
// ==============================
process.on("unhandledRejection", (err) => {
  logger.error(err);

  server.close(() => process.exit(1));
});

// ==============================
// Uncaught Exception
// ==============================
process.on("uncaughtException", (err) => {
  process.exit(1);
});

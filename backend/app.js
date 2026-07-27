const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const connectDB = require("./config/db");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const sanitizeInput = require("./middlewares/sanitizeInput");
const hpp = require("hpp");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { swaggerUi, swaggerDocument } = require("./config/swagger");
const apiRoutes = require("./routes");
const auditLogger = require("./middlewares/auditLogger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const requestLogger = require("./middlewares/requestLogger");
dotenv.config();
const app = express();
// ===============================
// Security Middlewares
// ===============================
app.use(helmet());

// Reflecting every origin (origin: true) while allowing credentials
// effectively disables CORS protection for cookie-based auth. Restrict
// to the configured client origin(s) instead.
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (no Origin header) and configured origins.
      if (
        !origin ||
        allowedOrigins.length === 0 ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(compression());

app.use(mongoSanitize());

app.use(sanitizeInput());

app.use(hpp());

// ===============================
// Logging
// ===============================

// ===============================
// Rate Limiter
// ===============================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", limiter);

app.use(morgan("dev"));
app.use(requestLogger);

// app.use(auditLogger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// ===============================
// Health Check
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Enterprise HRMS API Running 🚀",
  });
});

// Serve uploaded files (employee documents, invoices, etc.)
app.use("/uploads", express.static(require("path").join(__dirname, "uploads")));

// ===============================
// API Routes
// ===============================

app.use("/api/v1", apiRoutes);

// ===============================
// Error Handling
// ===============================

app.use(notFound);

app.use(errorHandler);

module.exports = app;

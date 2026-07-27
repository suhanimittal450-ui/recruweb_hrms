const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");

const {
  globalSearchValidator,
  suggestionValidator,
  analyticsValidator,
} = require("../../validators/searchValidator");
const globalSearchController = require("../../controllers/search/globalSearchController");
const searchPermission = require("../../middlewares/searchPermission");
const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");

// ==========================================
// Global Search
// GET /api/v1/search?q=rahul
// ==========================================
router.get(
  "/",
  authMiddleware,
  searchPermission,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER", "ACCOUNTANT", "EMPLOYEE"),
  globalSearchValidator,
  validate,
  globalSearchController.search,
);
router.get(
  "/suggestions",
  authMiddleware,
  searchPermission,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER", "ACCOUNTANT", "EMPLOYEE"),
  suggestionValidator,
  validate,
  globalSearchController.suggestions,
);
router.get(
  "/analytics",
  authMiddleware,
  searchPermission,
  authorize("SUPER_ADMIN", "ADMIN"),
  analyticsValidator,
  validate,
  globalSearchController.analytics,
);
router.get(
  "/",
  authMiddleware,
  searchPermission,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER", "ACCOUNTANT", "EMPLOYEE"),
  globalSearchController.search,
);

// ==========================================
// Search Suggestions
// GET /api/v1/search/suggestions?q=rah
// ==========================================
router.get(
  "/suggestions",
  authMiddleware,
  searchPermission,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER", "ACCOUNTANT", "EMPLOYEE"),
  globalSearchController.suggestions,
);

// ==========================================
// Search History
// GET /api/v1/search/history
// ==========================================
router.get(
  "/history",
  authMiddleware,
  searchPermission,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER", "ACCOUNTANT", "EMPLOYEE"),
  globalSearchController.history,
);

// ==========================================
// Recent Searches
// GET /api/v1/search/recent
// ==========================================
router.get(
  "/recent",
  authMiddleware,
  searchPermission,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER", "ACCOUNTANT", "EMPLOYEE"),
  globalSearchController.recent,
);

// ==========================================
// Search Analytics
// GET /api/v1/search/analytics
// ==========================================
router.get(
  "/analytics",
  authMiddleware,
  searchPermission,
  authorize("SUPER_ADMIN", "ADMIN"),
  globalSearchController.analytics,
);

// ==========================================
// Clear Search History
// DELETE /api/v1/search/history
// ==========================================
router.delete(
  "/history",
  authMiddleware,
  searchPermission,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER", "ACCOUNTANT", "EMPLOYEE"),
  globalSearchController.clearHistory,
);

module.exports = router;

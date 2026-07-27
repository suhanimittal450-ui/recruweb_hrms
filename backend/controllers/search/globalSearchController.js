const globalSearchService = require("../../services/search/globalSearchService");

class GlobalSearchController {
  // ==========================================
  // Global Search
  // GET /api/v1/search?q=abc
  // ==========================================
  async search(req, res, next) {
    try {
      const { q, page, limit } = req.query;

      const result = await globalSearchService.globalSearch(q, req.user, {
        page,
        limit,
      });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Search History
  // GET /api/v1/search/history
  // ==========================================
  async history(req, res, next) {
    try {
      const history = await globalSearchService.getSearchHistory(req.user);

      return res.status(200).json({
        success: true,
        count: history.length,
        data: history,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Recent Searches
  // GET /api/v1/search/recent
  // ==========================================
  async recent(req, res, next) {
    try {
      const recent = await globalSearchService.getRecentSearches(req.user);

      return res.status(200).json({
        success: true,
        count: recent.length,
        data: recent,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Search Suggestions
  // GET /api/v1/search/suggestions?q=abc
  // ==========================================
  async suggestions(req, res, next) {
    try {
      const { q } = req.query;

      const suggestions = await globalSearchService.getSuggestions(req.user, q);

      return res.status(200).json({
        success: true,
        count: suggestions.length,
        data: suggestions,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Clear Search History
  // DELETE /api/v1/search/history
  // ==========================================
  async clearHistory(req, res, next) {
    try {
      const result = await globalSearchService.clearHistory(req.user);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Search Analytics
  // GET /api/v1/search/analytics
  // ==========================================
  async analytics(req, res, next) {
    try {
      const analytics = await globalSearchService.analytics();

      return res.status(200).json({
        success: true,
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GlobalSearchController();

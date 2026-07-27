const globalSearchRepository = require("../../repositories/search/globalSearchRepository");
const SearchHistory = require("../../models/search/searchHistoryModel");

class GlobalSearchService {
  // ==========================================
  // Universal Search
  // ==========================================
  async globalSearch(query, user, options = {}) {
    if (!query || query.trim() === "") {
      throw new Error("Search query is required.");
    }

    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;

    let result = await globalSearchRepository.globalSearch(query, {
      page,
      limit,
      sort: { createdAt: -1 },
    });

    // ==========================================
    // Role Based Filter (Existing)
    // ==========================================
    if (user?.role?.name) {
      result = this.filterByRole(result, user.role.name);
    }

    // ==========================================
    // Permission Based Filter (NEW)
    // ==========================================
    const permissions = user?.searchPermission || {};

    if (!permissions.employees) delete result.employees;
    if (!permissions.candidates) delete result.candidates;
    if (!permissions.assets) delete result.assets;
    if (!permissions.vendors) delete result.vendors;
    if (!permissions.leaves) delete result.leaves;
    if (!permissions.attendance) delete result.attendance;
    if (!permissions.payroll) delete result.payroll;
    if (!permissions.invoices) delete result.invoices;
    if (!permissions.purchases) delete result.purchases;
    if (!permissions.notifications) delete result.notifications;

    // Save search history
    await this.saveSearchHistory(user, query);

    return {
      success: true,
      keyword: query,
      page,
      limit,
      totalResults:
        (result.employees?.total || 0) +
        (result.candidates?.total || 0) +
        (result.assets?.total || 0) +
        (result.vendors?.total || 0) +
        (result.leaves?.total || 0) +
        (result.attendance?.total || 0) +
        (result.payroll?.total || 0) +
        (result.invoices?.total || 0) +
        (result.purchases?.total || 0) +
        (result.notifications?.total || 0),
      data: result,
    };
  }

  // ==========================================
  // Save Search History
  // ==========================================
  async saveSearchHistory(user, keyword) {
    if (!user || !keyword) return;

    await SearchHistory.create({
      user: user._id || user.id,
      keyword,
      searchedAt: new Date(),
    });
  }

  // ==========================================
  // Get Search History
  // ==========================================
  async getSearchHistory(user) {
    return SearchHistory.find({
      user: user._id || user.id,
    })
      .sort({ searchedAt: -1 })
      .limit(20)
      .lean();
  }

  // ==========================================
  // Recent Searches
  // ==========================================
  async getRecentSearches(user) {
    return SearchHistory.find({
      user: user._id || user.id,
    })
      .sort({ searchedAt: -1 })
      .limit(10)
      .select("keyword searchedAt")
      .lean();
  }

  // ==========================================
  // Delete History
  // ==========================================
  async clearHistory(user) {
    await SearchHistory.deleteMany({
      user: user._id || user.id,
    });

    return {
      success: true,
      message: "Search history cleared successfully.",
    };
  }

  // ==========================================
  // Search Suggestions
  // ==========================================
  async getSuggestions(user, keyword) {
    const history = await SearchHistory.find({
      user: user._id || user.id,
      keyword: {
        $regex: keyword,
        $options: "i",
      },
    })
      .limit(5)
      .lean();

    return history.map((item) => item.keyword);
  }

  // ==========================================
  // Search Analytics
  // ==========================================
  async analytics() {
    const totalSearches = await SearchHistory.countDocuments();

    const topKeywords = await SearchHistory.aggregate([
      {
        $group: {
          _id: "$keyword",
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    return {
      totalSearches,
      topKeywords,
    };
  }

  // ==========================================
  // Role Based Filter
  // ==========================================
  filterByRole(result, role) {
    switch ((role || "").toUpperCase()) {
      case "EMPLOYEE":
        delete result.payroll;
        delete result.candidates;
        break;

      case "HR":
        delete result.invoices;
        break;

      case "ACCOUNTANT":
        delete result.candidates;
        break;

      default:
        break;
    }

    return result;
  }
}

module.exports = new GlobalSearchService();

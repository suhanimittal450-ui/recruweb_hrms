const SearchHistory = require("../../models/search/searchHistoryModel");

class SearchAnalyticsService {
  // ==========================================
  // Dashboard Analytics
  // ==========================================
  async dashboard() {
    const totalSearches = await SearchHistory.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySearches = await SearchHistory.countDocuments({
      searchedAt: {
        $gte: today,
      },
    });

    const topKeywords = await SearchHistory.aggregate([
      {
        $group: {
          _id: "$keyword",
          total: {
            $sum: 1,
          },
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

    const topUsers = await SearchHistory.aggregate([
      {
        $group: {
          _id: "$user",
          total: {
            $sum: 1,
          },
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
      todaySearches,
      topKeywords,
      topUsers,
    };
  }

  // ==========================================
  // Daily Analytics
  // ==========================================
  async daily(days = 7) {
    return SearchHistory.aggregate([
      {
        $match: {
          searchedAt: {
            $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$searchedAt",
            },
          },
          total: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  }

  // ==========================================
  // Monthly Analytics
  // ==========================================
  async monthly() {
    return SearchHistory.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$searchedAt",
            },
          },
          total: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  }
}

module.exports = new SearchAnalyticsService();

class SearchHelper {
  // ==========================================
  // Escape Regex Characters
  // ==========================================
  escapeRegex(text = "") {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // ==========================================
  // Sanitize Query
  // ==========================================
  sanitizeQuery(query = "") {
    return query.trim().replace(/\s+/g, " ");
  }

  // ==========================================
  // Create Mongo Search Regex
  // ==========================================
  createRegex(query) {
    return new RegExp(this.escapeRegex(query), "i");
  }

  // ==========================================
  // Build Pagination
  // ==========================================
  getPagination(page = 1, limit = 10) {
    page = Number(page) || 1;
    limit = Number(limit) || 10;

    return {
      skip: (page - 1) * limit,
      limit,
    };
  }

  // ==========================================
  // Build Sort
  // ==========================================
  getSort(sort = "-createdAt") {
    const obj = {};

    if (sort.startsWith("-")) {
      obj[sort.substring(1)] = -1;
    } else {
      obj[sort] = 1;
    }

    return obj;
  }

  // ==========================================
  // Date Filter
  // ==========================================
  buildDateFilter(from, to) {
    if (!from && !to) return {};

    const filter = {};

    if (from) {
      filter.$gte = new Date(from);
    }

    if (to) {
      filter.$lte = new Date(to);
    }

    return {
      createdAt: filter,
    };
  }

  // ==========================================
  // Highlight Keyword
  // ==========================================
  highlight(text = "", keyword = "") {
    if (!keyword) return text;

    const regex = new RegExp(`(${this.escapeRegex(keyword)})`, "ig");

    return text.replace(regex, "<mark>$1</mark>");
  }

  // ==========================================
  // Remove Duplicate Results
  // ==========================================
  unique(items = []) {
    const map = new Map();

    items.forEach((item) => {
      map.set(item._id.toString(), item);
    });

    return [...map.values()];
  }

  // ==========================================
  // Search Score
  // ==========================================
  calculateScore(text = "", keyword = "") {
    if (!text || !keyword) return 0;

    const regex = new RegExp(this.escapeRegex(keyword), "ig");

    const matches = text.match(regex);

    return matches ? matches.length : 0;
  }

  // ==========================================
  // Format Result
  // ==========================================
  formatResult(type, records) {
    return {
      type,
      count: records.length,
      data: records,
    };
  }

  // ==========================================
  // Empty Response
  // ==========================================
  emptyResult() {
    return {
      employees: [],
      candidates: [],
      assets: [],
      vendors: [],
      leaves: [],
      attendance: [],
      payroll: [],
      invoices: [],
      purchases: [],
      notifications: [],
    };
  }
}

module.exports = new SearchHelper();

class DashboardHelper {
  // ==========================================
  // Calculate Growth Percentage
  // ==========================================
  calculateGrowth(current = 0, previous = 0) {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }

    return Number((((current - previous) / previous) * 100).toFixed(2));
  }

  // ==========================================
  // KPI Percentage
  // ==========================================
  percentage(value = 0, total = 0) {
    if (!total) return 0;

    return Number(((value / total) * 100).toFixed(2));
  }

  // ==========================================
  // Currency Formatter
  // ==========================================
  currency(amount = 0) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  }

  // ==========================================
  // Number Formatter
  // ==========================================
  number(value = 0) {
    return new Intl.NumberFormat("en-IN").format(value);
  }

  // ==========================================
  // Month Labels
  // ==========================================
  monthLabels() {
    return [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  }

  // ==========================================
  // Trend
  // ==========================================
  trend(current, previous) {
    if (current > previous) {
      return "UP";
    }

    if (current < previous) {
      return "DOWN";
    }

    return "STABLE";
  }

  // ==========================================
  // Trend Color
  // ==========================================
  trendColor(trend) {
    switch (trend) {
      case "UP":
        return "green";

      case "DOWN":
        return "red";

      default:
        return "gray";
    }
  }

  // ==========================================
  // KPI Card
  // ==========================================
  createCard({ title, value, previous = 0, icon = "" }) {
    const growth = this.calculateGrowth(value, previous);

    const trend = this.trend(value, previous);

    return {
      title,
      value,
      previous,
      growth,
      trend,
      color: this.trendColor(trend),
      icon,
    };
  }

  // ==========================================
  // Pie Chart
  // ==========================================
  pie(labels = [], values = []) {
    return labels.map((label, index) => ({
      name: label,
      value: values[index] || 0,
    }));
  }

  // ==========================================
  // Line Chart
  // ==========================================
  line(labels = [], values = []) {
    return labels.map((label, index) => ({
      label,
      value: values[index] || 0,
    }));
  }

  // ==========================================
  // Bar Chart
  // ==========================================
  bar(labels = [], values = []) {
    return labels.map((label, index) => ({
      category: label,
      total: values[index] || 0,
    }));
  }

  // ==========================================
  // Dashboard Response
  // ==========================================
  response(data = {}) {
    return {
      generatedAt: new Date(),
      success: true,
      data,
    };
  }
}

module.exports = new DashboardHelper();

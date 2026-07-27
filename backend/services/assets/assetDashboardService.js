const assetDashboardRepository = require("../../repositories/assets/assetDashboardRepository");

class AssetDashboardService {
  // ===========================================
  // Dashboard
  // ===========================================

  async dashboard() {
    const [
      summary,
      cost,
      assignments,
      maintenance,
      warranty,
      depreciation,
      recentAssets,
    ] = await Promise.all([
      assetDashboardRepository.getAssetSummary(),
      assetDashboardRepository.getAssetCost(),
      assetDashboardRepository.assignmentSummary(),
      assetDashboardRepository.maintenanceSummary(),
      assetDashboardRepository.warrantyExpiring(30),
      assetDashboardRepository.depreciationSummary(),
      assetDashboardRepository.recentAssets(10),
    ]);

    return {
      summary,

      financial: {
        totalPurchaseCost: cost.totalPurchaseCost || 0,

        averagePrice: cost.averagePrice || 0,

        highestPrice: cost.highestPrice || 0,

        lowestPrice: cost.lowestPrice || 0,

        totalDepreciation: depreciation.totalDepreciation || 0,

        totalCurrentValue: depreciation.totalCurrentValue || 0,
      },

      assignments,

      maintenance,

      warrantyExpiring: warranty,

      recentAssets,

      generatedAt: new Date(),
    };
  }

  // ===========================================
  // KPI Cards
  // ===========================================

  async kpis() {
    const summary = await assetDashboardRepository.getAssetSummary();

    const cost = await assetDashboardRepository.getAssetCost();

    const depreciation = await assetDashboardRepository.depreciationSummary();

    return {
      totalAssets: summary.totalAssets,

      assignedAssets: summary.assignedAssets,

      availableAssets: summary.availableAssets,

      maintenanceAssets: summary.maintenanceAssets,

      disposedAssets: summary.disposedAssets,

      totalPurchaseCost: cost.totalPurchaseCost || 0,

      averageAssetPrice: cost.averagePrice || 0,

      currentAssetValue: depreciation.totalCurrentValue || 0,
    };
  }

  // ===========================================
  // Warranty Widget
  // ===========================================

  async warrantyWidget(days = 30) {
    return await assetDashboardRepository.warrantyExpiring(days);
  }

  // ===========================================
  // Recent Assets Widget
  // ===========================================

  async recentAssets(limit = 10) {
    return await assetDashboardRepository.recentAssets(limit);
  }

  // ===========================================
  // Assignment Chart
  // ===========================================

  async assignmentChart() {
    return await assetDashboardRepository.assignmentSummary();
  }

  // ===========================================
  // Maintenance Chart
  // ===========================================

  async maintenanceChart() {
    return await assetDashboardRepository.maintenanceSummary();
  }

  // ===========================================
  // Financial Widget
  // ===========================================

  async financialSummary() {
    const cost = await assetDashboardRepository.getAssetCost();

    const depreciation = await assetDashboardRepository.depreciationSummary();

    return {
      totalPurchaseCost: cost.totalPurchaseCost || 0,

      averagePrice: cost.averagePrice || 0,

      highestPrice: cost.highestPrice || 0,

      lowestPrice: cost.lowestPrice || 0,

      totalDepreciation: depreciation.totalDepreciation || 0,

      totalCurrentValue: depreciation.totalCurrentValue || 0,
    };
  }
}

module.exports = new AssetDashboardService();

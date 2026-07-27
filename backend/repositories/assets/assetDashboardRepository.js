const Asset = require("../../models/assets/Asset");
const AssetAssignment = require("../../models/assets/AssetAssignment");
const AssetMaintenance = require("../../models/assets/AssetMaintenance");
const Warranty = require("../../models/assets/Warranty");
const Depreciation = require("../../models/assets/Depreciation");

class AssetDashboardRepository {
  // ===========================================
  // Asset Summary
  // ===========================================

  async getAssetSummary() {
    const [
      totalAssets,
      activeAssets,
      assignedAssets,
      availableAssets,
      maintenanceAssets,
      disposedAssets,
    ] = await Promise.all([
      Asset.countDocuments({ isDeleted: false }),

      Asset.countDocuments({
        status: "ACTIVE",
        isDeleted: false,
      }),

      Asset.countDocuments({
        assetStatus: "ASSIGNED",
        isDeleted: false,
      }),

      Asset.countDocuments({
        assetStatus: "AVAILABLE",
        isDeleted: false,
      }),

      Asset.countDocuments({
        assetStatus: "MAINTENANCE",
        isDeleted: false,
      }),

      Asset.countDocuments({
        assetStatus: "DISPOSED",
        isDeleted: false,
      }),
    ]);

    return {
      totalAssets,
      activeAssets,
      assignedAssets,
      availableAssets,
      maintenanceAssets,
      disposedAssets,
    };
  }

  // ===========================================
  // Asset Cost
  // ===========================================

  async getAssetCost() {
    const result = await Asset.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: null,

          totalPurchaseCost: {
            $sum: "$purchasePrice",
          },

          averagePrice: {
            $avg: "$purchasePrice",
          },

          highestPrice: {
            $max: "$purchasePrice",
          },

          lowestPrice: {
            $min: "$purchasePrice",
          },
        },
      },
    ]);

    return result[0] || {};
  }

  // ===========================================
  // Assignment Summary
  // ===========================================

  async assignmentSummary() {
    return await AssetAssignment.aggregate([
      {
        $group: {
          _id: "$status",
          total: {
            $sum: 1,
          },
        },
      },
    ]);
  }

  // ===========================================
  // Maintenance Summary
  // ===========================================

  async maintenanceSummary() {
    return await AssetMaintenance.aggregate([
      {
        $group: {
          _id: "$status",
          total: {
            $sum: 1,
          },
        },
      },
    ]);
  }

  // ===========================================
  // Warranty Expiring
  // ===========================================

  async warrantyExpiring(days = 30) {
    const today = new Date();

    const expiry = new Date();

    expiry.setDate(today.getDate() + Number(days));

    return await Warranty.find({
      expiryDate: {
        $gte: today,
        $lte: expiry,
      },
      isDeleted: false,
    })
      .populate("asset", "assetCode assetName")
      .sort({
        expiryDate: 1,
      });
  }

  // ===========================================
  // Depreciation Summary
  // ===========================================

  async depreciationSummary() {
    const result = await Depreciation.aggregate([
      {
        $group: {
          _id: null,

          totalDepreciation: {
            $sum: "$depreciationAmount",
          },

          totalCurrentValue: {
            $sum: "$currentValue",
          },
        },
      },
    ]);

    return result[0] || {};
  }

  // ===========================================
  // Recent Assets
  // ===========================================

  async recentAssets(limit = 10) {
    return await Asset.find({
      isDeleted: false,
    })
      .sort({
        createdAt: -1,
      })
      .limit(Number(limit));
  }
}

module.exports = new AssetDashboardRepository();

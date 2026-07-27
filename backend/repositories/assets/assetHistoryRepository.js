const AssetHistory = require("../../models/assets/AssetHistory");

class AssetHistoryRepository {
  // =====================================
  // Create History
  // =====================================
  async create(payload) {
    return await AssetHistory.create(payload);
  }

  // =====================================
  // Find By Id
  // =====================================
  async findById(id) {
    return await AssetHistory.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("asset")
      .populate("createdBy", "firstName lastName email")
      .populate("deletedBy", "firstName lastName email");
  }

  // =====================================
  // Find By Asset
  // =====================================
  async findByAsset(assetId, options = {}) {
    const {
      page = 1,
      limit = 10,
      action,
      sortBy = "createdAt",
      order = "desc",
    } = options;

    const query = {
      asset: assetId,
      isDeleted: false,
    };

    if (action) {
      query.action = action;
    }

    const skip = (page - 1) * Number(limit);

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const [data, total] = await Promise.all([
      AssetHistory.find(query)
        .populate("createdBy", "firstName lastName")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),

      AssetHistory.countDocuments(query),
    ]);

    return {
      data,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // =====================================
  // Find All
  // =====================================
  async findAll({
    page = 1,
    limit = 10,
    action,
    asset,
    referenceModel,
    search = "",
    sortBy = "createdAt",
    order = "desc",
  }) {
    const query = {
      isDeleted: false,
    };

    if (action) query.action = action;
    if (asset) query.asset = asset;
    if (referenceModel) query.referenceModel = referenceModel;

    if (search) {
      query.remarks = {
        $regex: search,
        $options: "i",
      };
    }

    const skip = (page - 1) * Number(limit);

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const [data, total] = await Promise.all([
      AssetHistory.find(query)
        .populate("asset", "assetCode assetName")
        .populate("createdBy", "firstName lastName")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),

      AssetHistory.countDocuments(query),
    ]);

    return {
      data,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // =====================================
  // Update
  // =====================================
  async update(id, payload) {
    return await AssetHistory.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      payload,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
  }

  // =====================================
  // Soft Delete
  // =====================================
  async softDelete(id, deletedBy) {
    return await AssetHistory.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy,
      },
      {
        returnDocument: "after",
      },
    );
  }

  // =====================================
  // Restore
  // =====================================
  async restore(id) {
    return await AssetHistory.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
      },
      {
        returnDocument: "after",
      },
    );
  }

  // =====================================
  // Latest Activity
  // =====================================
  async latest(limit = 10) {
    return await AssetHistory.find({
      isDeleted: false,
    })
      .populate("asset", "assetCode assetName")
      .populate("createdBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(Number(limit));
  }

  // =====================================
  // Count
  // =====================================
  async count() {
    return await AssetHistory.countDocuments({
      isDeleted: false,
    });
  }
}

module.exports = new AssetHistoryRepository();

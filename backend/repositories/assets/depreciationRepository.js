const Depreciation = require("../../models/assets/Depreciation");

class DepreciationRepository {
  // =====================================
  // Create
  // =====================================
  async create(payload) {
    return await Depreciation.create(payload);
  }

  // =====================================
  // Find By Id
  // =====================================
  async findById(id) {
    return await Depreciation.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("asset")
      .populate("purchaseDetail")
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email");
  }

  // =====================================
  // Find By Asset
  // =====================================
  async findByAsset(assetId) {
    return await Depreciation.findOne({
      asset: assetId,
      isDeleted: false,
    })
      .populate("asset")
      .populate("purchaseDetail");
  }

  // =====================================
  // Get All
  // =====================================
  async findAll({
    page = 1,
    limit = 10,
    search = "",
    asset,
    status,
    method,
    sortBy = "createdAt",
    order = "desc",
  }) {
    const query = {
      isDeleted: false,
    };

    if (asset) {
      query.asset = asset;
    }

    if (status) {
      query.status = status;
    }

    if (method) {
      query.method = method;
    }

    if (search) {
      query.$or = [
        {
          remarks: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const skip = (page - 1) * Number(limit);

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const [data, total] = await Promise.all([
      Depreciation.find(query)
        .populate("asset", "assetCode assetName")
        .populate("purchaseDetail", "purchaseNumber")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),

      Depreciation.countDocuments(query),
    ]);

    return {
      data,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }

  // =====================================
  // Update
  // =====================================
  async update(id, payload) {
    return await Depreciation.findOneAndUpdate(
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
    return await Depreciation.findOneAndUpdate(
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
    return await Depreciation.findByIdAndUpdate(
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
  // Count
  // =====================================
  async count() {
    return await Depreciation.countDocuments({
      isDeleted: false,
    });
  }

  // =====================================
  // Monthly Depreciation Report
  // =====================================
  async monthlyReport() {
    return await Depreciation.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: null,
          totalMonthlyDepreciation: {
            $sum: "$monthlyDepreciation",
          },
        },
      },
    ]);
  }

  // =====================================
  // Annual Depreciation Report
  // =====================================
  async annualReport() {
    return await Depreciation.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: null,
          totalAnnualDepreciation: {
            $sum: "$annualDepreciation",
          },
        },
      },
    ]);
  }

  // =====================================
  // Asset Book Value Report
  // =====================================
  async bookValueReport() {
    return await Depreciation.find({
      isDeleted: false,
    })
      .populate("asset", "assetCode assetName")
      .select(
        "currentBookValue accumulatedDepreciation annualDepreciation monthlyDepreciation",
      );
  }
}

module.exports = new DepreciationRepository();

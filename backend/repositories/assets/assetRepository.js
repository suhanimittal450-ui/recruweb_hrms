const Asset = require("../../models/assets/Asset");

class AssetRepository {
  // ===========================
  // Create Asset
  // ===========================
  async create(data) {
    return await Asset.create(data);
  }

  // ===========================
  // Find By Id
  // ===========================
  async findById(id) {
    return await Asset.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("category")
      .populate("vendor")
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email");
  }

  // ===========================
  // Find By Asset Code
  // ===========================
  async findByCode(assetCode) {
    return await Asset.findOne({
      assetCode: assetCode.toUpperCase(),
      isDeleted: false,
    });
  }

  // ===========================
  // Find By Serial Number
  // ===========================
  async findBySerialNumber(serialNumber) {
    return await Asset.findOne({
      serialNumber,
      isDeleted: false,
    });
  }

  // ===========================
  // Get All Assets
  // ===========================
  async findAll({
    page = 1,
    limit = 10,
    search = "",
    status,
    category,
    sortBy = "createdAt",
    order = "desc",
  }) {
    const query = {
      isDeleted: false,
    };

    if (search) {
      query.$or = [
        { assetCode: { $regex: search, $options: "i" } },
        { assetName: { $regex: search, $options: "i" } },
        { serialNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (status) query.status = status;
    if (category) query.category = category;

    const skip = (page - 1) * limit;

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const [data, total] = await Promise.all([
      Asset.find(query)
        .populate("category", "name code")
        .populate("vendor", "name")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),

      Asset.countDocuments(query),
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

  // ===========================
  // Update
  // ===========================
  async update(id, payload) {
    return await Asset.findOneAndUpdate(
      { _id: id, isDeleted: false },
      payload,
      {
        returnDocument: "after",

        runValidators: true,
      },
    );
  }

  // ===========================
  // Soft Delete
  // ===========================
  async softDelete(id, deletedBy) {
    return await Asset.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy,
      },
      { returnDocument: "after" },
    );
  }

  // ===========================
  // Count
  // ===========================
  async count() {
    return await Asset.countDocuments({
      isDeleted: false,
    });
  }
}

module.exports = new AssetRepository();

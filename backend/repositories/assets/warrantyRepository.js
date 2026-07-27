const Warranty = require("../../models/assets/Warranty");

class WarrantyRepository {
  // ===================================
  // Create Warranty
  // ===================================
  async create(data) {
    return await Warranty.create(data);
  }

  // ===================================
  // Find By Id
  // ===================================
  async findById(id) {
    return await Warranty.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("asset")
      .populate("vendor")
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email");
  }

  // ===================================
  // Find By Warranty Number
  // ===================================
  async findByWarrantyNumber(warrantyNumber) {
    return await Warranty.findOne({
      warrantyNumber: warrantyNumber.toUpperCase(),
      isDeleted: false,
    });
  }

  // ===================================
  // Find By Asset
  // ===================================
  async findByAsset(assetId) {
    return await Warranty.find({
      asset: assetId,
      isDeleted: false,
    }).populate("vendor");
  }

  // ===================================
  // Get All Warranties
  // ===================================
  async findAll({
    page = 1,
    limit = 10,
    search = "",
    status,
    asset,
    vendor,
    expired,
    sortBy = "createdAt",
    order = "desc",
  }) {
    const query = {
      isDeleted: false,
    };

    if (search) {
      query.warrantyNumber = {
        $regex: search,
        $options: "i",
      };
    }

    if (status) query.status = status;
    if (asset) query.asset = asset;
    if (vendor) query.vendor = vendor;

    if (expired === "true") {
      query.endDate = {
        $lt: new Date(),
      };
    }

    const skip = (page - 1) * limit;

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const [data, total] = await Promise.all([
      Warranty.find(query)
        .populate("asset", "assetCode assetName")
        .populate("vendor", "vendorName vendorCode")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),

      Warranty.countDocuments(query),
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

  // ===================================
  // Update Warranty
  // ===================================
  async update(id, payload) {
    return await Warranty.findOneAndUpdate(
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

  // ===================================
  // Soft Delete
  // ===================================
  async softDelete(id, deletedBy) {
    return await Warranty.findOneAndUpdate(
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

  // ===================================
  // Restore
  // ===================================
  async restore(id) {
    return await Warranty.findByIdAndUpdate(
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

  // ===================================
  // Count
  // ===================================
  async count() {
    return await Warranty.countDocuments({
      isDeleted: false,
    });
  }

  // ===================================
  // Expiring Within X Days
  // ===================================
  async expiringWithin(days = 30) {
    const today = new Date();

    const future = new Date();
    future.setDate(today.getDate() + Number(days));

    return await Warranty.find({
      isDeleted: false,
      endDate: {
        $gte: today,
        $lte: future,
      },
      status: "ACTIVE",
    })
      .populate("asset", "assetCode assetName")
      .populate("vendor", "vendorName");
  }
}

module.exports = new WarrantyRepository();

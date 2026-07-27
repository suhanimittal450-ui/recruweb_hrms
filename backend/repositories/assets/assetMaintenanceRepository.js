const AssetMaintenance = require("../../models/assets/AssetMaintenance");

class AssetMaintenanceRepository {
  // =====================================
  // Create
  // =====================================
  async create(payload) {
    return await AssetMaintenance.create(payload);
  }

  // =====================================
  // Find By Id
  // =====================================
  async findById(id) {
    return await AssetMaintenance.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("asset")
      .populate("vendor")
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email");
  }

  // =====================================
  // Find By Maintenance Number
  // =====================================
  async findByMaintenanceNumber(number) {
    return await AssetMaintenance.findOne({
      maintenanceNumber: number,
      isDeleted: false,
    });
  }

  // =====================================
  // Find All
  // =====================================
  async findAll({
    page = 1,
    limit = 10,
    search = "",
    asset,
    vendor,
    maintenanceType,
    priority,
    status,
    sortBy = "createdAt",
    order = "desc",
  }) {
    const query = {
      isDeleted: false,
    };

    if (asset) query.asset = asset;

    if (vendor) query.vendor = vendor;

    if (maintenanceType) query.maintenanceType = maintenanceType;

    if (priority) query.priority = priority;

    if (status) query.status = status;

    if (search) {
      query.$or = [
        {
          maintenanceNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          technicianName: {
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
      AssetMaintenance.find(query)
        .populate("asset", "assetCode assetName")
        .populate("vendor", "vendorName vendorCode")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),

      AssetMaintenance.countDocuments(query),
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
    return await AssetMaintenance.findOneAndUpdate(
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
    return await AssetMaintenance.findOneAndUpdate(
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
    return await AssetMaintenance.findByIdAndUpdate(
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
    return await AssetMaintenance.countDocuments({
      isDeleted: false,
    });
  }

  // =====================================
  // Upcoming Maintenance
  // =====================================
  async findUpcoming(days = 30) {
    const endDate = new Date();

    endDate.setDate(endDate.getDate() + Number(days));

    return await AssetMaintenance.find({
      scheduledDate: {
        $gte: new Date(),
        $lte: endDate,
      },
      isDeleted: false,
    })
      .populate("asset", "assetCode assetName")
      .populate("vendor", "vendorName");
  }

  // =====================================
  // Overdue Maintenance
  // =====================================
  async findOverdue() {
    return await AssetMaintenance.find({
      scheduledDate: {
        $lt: new Date(),
      },
      status: {
        $ne: "COMPLETED",
      },
      isDeleted: false,
    })
      .populate("asset", "assetCode assetName")
      .populate("vendor", "vendorName");
  }
}

module.exports = new AssetMaintenanceRepository();

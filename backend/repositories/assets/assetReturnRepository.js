const AssetReturn = require("../../models/assets/AssetReturn");

class AssetReturnRepository {
  // ===================================
  // Create Return
  // ===================================
  async create(data) {
    return await AssetReturn.create(data);
  }

  // ===================================
  // Find By Id
  // ===================================
  async findById(id) {
    return await AssetReturn.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("assignment")
      .populate("asset")
      .populate("employee")
      .populate("returnedBy", "firstName lastName email")
      .populate("receivedBy", "firstName lastName email")
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email");
  }

  // ===================================
  // Find By Assignment
  // ===================================
  async findByAssignment(assignmentId) {
    return await AssetReturn.findOne({
      assignment: assignmentId,
      isDeleted: false,
    });
  }

  // ===================================
  // Get All Returns
  // ===================================
  async findAll({
    page = 1,
    limit = 10,
    employee,
    asset,
    returnCondition,
    startDate,
    endDate,
    sortBy = "returnDate",
    order = "desc",
  }) {
    const query = {
      isDeleted: false,
    };

    if (employee) query.employee = employee;
    if (asset) query.asset = asset;
    if (returnCondition) query.returnCondition = returnCondition;

    if (startDate || endDate) {
      query.returnDate = {};

      if (startDate) {
        query.returnDate.$gte = new Date(startDate);
      }

      if (endDate) {
        query.returnDate.$lte = new Date(endDate);
      }
    }

    const skip = (page - 1) * Number(limit);

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const [data, total] = await Promise.all([
      AssetReturn.find(query)
        .populate("asset", "assetCode assetName")
        .populate("employee", "employeeId firstName lastName")
        .populate("assignment")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),

      AssetReturn.countDocuments(query),
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
  // Update
  // ===================================
  async update(id, payload) {
    return await AssetReturn.findOneAndUpdate(
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
    return await AssetReturn.findOneAndUpdate(
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
    return await AssetReturn.findByIdAndUpdate(
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
    return await AssetReturn.countDocuments({
      isDeleted: false,
    });
  }

  // ===================================
  // Damaged Returns
  // ===================================
  async findDamagedReturns() {
    return await AssetReturn.find({
      isDeleted: false,
      returnCondition: {
        $in: ["DAMAGED", "LOST"],
      },
    })
      .populate("asset", "assetCode assetName")
      .populate("employee", "employeeId firstName lastName");
  }
}

module.exports = new AssetReturnRepository();

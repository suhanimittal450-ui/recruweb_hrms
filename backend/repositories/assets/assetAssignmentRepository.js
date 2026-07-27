const AssetAssignment = require("../../models/assets/AssetAssignment");

class AssetAssignmentRepository {
  // ===================================
  // Create Assignment
  // ===================================
  async create(data) {
    return await AssetAssignment.create(data);
  }

  // ===================================
  // Find By Id
  // ===================================
  async findById(id) {
    return await AssetAssignment.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("asset")
      .populate("employee")
      .populate("assignedBy", "firstName lastName email")
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email");
  }

  // ===================================
  // Active Assignment By Asset
  // ===================================
  async findActiveByAsset(assetId) {
    return await AssetAssignment.findOne({
      asset: assetId,
      assignmentStatus: "ASSIGNED",
      isDeleted: false,
    });
  }

  // ===================================
  // Active Assignment By Employee
  // ===================================
  async findActiveByEmployee(employeeId) {
    return await AssetAssignment.find({
      employee: employeeId,
      assignmentStatus: "ASSIGNED",
      isDeleted: false,
    }).populate("asset");
  }

  // ===================================
  // Get All Assignments
  // ===================================
  async findAll({
    page = 1,
    limit = 10,
    search = "",
    employee,
    asset,
    assignmentStatus,
    sortBy = "createdAt",
    order = "desc",
  }) {
    const query = {
      isDeleted: false,
    };

    if (employee) {
      query.employee = employee;
    }

    if (asset) {
      query.asset = asset;
    }

    if (assignmentStatus) {
      query.assignmentStatus = assignmentStatus;
    }

    const skip = (page - 1) * limit;

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const [data, total] = await Promise.all([
      AssetAssignment.find(query)
        .populate("asset", "assetCode assetName")
        .populate("employee", "employeeId firstName lastName")
        .populate("assignedBy", "firstName lastName")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),

      AssetAssignment.countDocuments(query),
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
  // Update Assignment
  // ===================================
  async update(id, payload) {
    return await AssetAssignment.findOneAndUpdate(
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
    return await AssetAssignment.findOneAndUpdate(
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
    return await AssetAssignment.findByIdAndUpdate(
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
    return await AssetAssignment.countDocuments({
      isDeleted: false,
    });
  }

  // ===================================
  // Overdue Assignments
  // ===================================
  async findOverdue() {
    return await AssetAssignment.find({
      assignmentStatus: "ASSIGNED",
      expectedReturnDate: {
        $lt: new Date(),
      },
      isDeleted: false,
    })
      .populate("asset", "assetCode assetName")
      .populate("employee", "employeeId firstName lastName");
  }
}

module.exports = new AssetAssignmentRepository();

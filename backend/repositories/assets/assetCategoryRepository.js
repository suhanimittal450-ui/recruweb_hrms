const AssetCategory = require("../../models/assets/AssetCategory");

class AssetCategoryRepository {
  // ===========================
  // Create
  // ===========================
  async create(data) {
    return await AssetCategory.create(data);
  }

  // ===========================
  // Find By Id
  // ===========================
  async findById(id) {
    return await AssetCategory.findOne({
      _id: id,
      isDeleted: false,
    });
  }

  // ===========================
  // Find By Name
  // ===========================
  async findByName(name) {
    return await AssetCategory.findOne({
      name: new RegExp(`^${name}$`, "i"),
      isDeleted: false,
    });
  }

  // ===========================
  // Find By Code
  // ===========================
  async findByCode(code) {
    return await AssetCategory.findOne({
      code: code.toUpperCase(),
      isDeleted: false,
    });
  }

  // ===========================
  // List With Pagination
  // ===========================
  async findAll({
    page = 1,
    limit = 10,
    search = "",
    status,
    sortBy = "createdAt",
    order = "desc",
  }) {
    const query = {
      isDeleted: false,
    };

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          code: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const [items, total] = await Promise.all([
      AssetCategory.find(query).sort(sort).skip(skip).limit(Number(limit)),

      AssetCategory.countDocuments(query),
    ]);

    return {
      data: items,
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
  async update(id, data) {
    return await AssetCategory.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      data,
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
    return await AssetCategory.findOneAndUpdate(
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

  // ===========================
  // Restore
  // ===========================
  async restore(id) {
    return await AssetCategory.findByIdAndUpdate(
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

  // ===========================
  // Count
  // ===========================
  async count() {
    return await AssetCategory.countDocuments({
      isDeleted: false,
    });
  }
}

module.exports = new AssetCategoryRepository();

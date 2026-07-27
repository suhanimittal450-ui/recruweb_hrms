const Vendor = require("../../models/assets/Vendor");

class VendorRepository {
  // ===================================
  // Create Vendor
  // ===================================
  async create(data) {
    return await Vendor.create(data);
  }

  // ===================================
  // Find By Id
  // ===================================
  async findById(id) {
    return await Vendor.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email");
  }

  // ===================================
  // Find By Vendor Code
  // ===================================
  async findByVendorCode(vendorCode) {
    return await Vendor.findOne({
      vendorCode: vendorCode.toUpperCase(),
      isDeleted: false,
    });
  }

  // ===================================
  // Find By Email
  // ===================================
  async findByEmail(email) {
    return await Vendor.findOne({
      email: email.toLowerCase(),
      isDeleted: false,
    });
  }

  // ===================================
  // Get All Vendors
  // ===================================
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
          vendorName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          vendorCode: {
            $regex: search,
            $options: "i",
          },
        },
        {
          contactPerson: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
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

    const [data, total] = await Promise.all([
      Vendor.find(query).sort(sort).skip(skip).limit(Number(limit)),

      Vendor.countDocuments(query),
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
  // Update Vendor
  // ===================================
  async update(id, payload) {
    return await Vendor.findOneAndUpdate(
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
    return await Vendor.findOneAndUpdate(
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
  // Restore Vendor
  // ===================================
  async restore(id) {
    return await Vendor.findByIdAndUpdate(
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
  // Count Vendors
  // ===================================
  async count() {
    return await Vendor.countDocuments({
      isDeleted: false,
    });
  }
}

module.exports = new VendorRepository();

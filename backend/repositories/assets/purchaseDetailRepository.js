const PurchaseDetail = require("../../models/assets/PurchaseDetail");

class PurchaseDetailRepository {
  // =====================================
  // Create
  // =====================================
  async create(payload) {
    return await PurchaseDetail.create(payload);
  }

  // =====================================
  // Find By Id
  // =====================================
  async findById(id) {
    return await PurchaseDetail.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("asset")
      .populate("vendor")
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email");
  }

  // =====================================
  // Find By Purchase Number
  // =====================================
  async findByPurchaseNumber(number) {
    return await PurchaseDetail.findOne({
      purchaseNumber: number,
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
    paymentStatus,
    paymentMethod,
    startDate,
    endDate,
    sortBy = "purchaseDate",
    order = "desc",
  }) {
    const query = {
      isDeleted: false,
    };

    if (asset) query.asset = asset;

    if (vendor) query.vendor = vendor;

    if (paymentStatus) query.paymentStatus = paymentStatus;

    if (paymentMethod) query.paymentMethod = paymentMethod;

    if (startDate || endDate) {
      query.purchaseDate = {};

      if (startDate) query.purchaseDate.$gte = new Date(startDate);

      if (endDate) query.purchaseDate.$lte = new Date(endDate);
    }

    if (search) {
      query.$or = [
        {
          purchaseNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          invoiceNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          purchaseOrderNumber: {
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
      PurchaseDetail.find(query)
        .populate("asset", "assetCode assetName")
        .populate("vendor", "vendorCode vendorName")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),

      PurchaseDetail.countDocuments(query),
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
    return await PurchaseDetail.findOneAndUpdate(
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
    return await PurchaseDetail.findOneAndUpdate(
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
    return await PurchaseDetail.findByIdAndUpdate(
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
    return await PurchaseDetail.countDocuments({
      isDeleted: false,
    });
  }

  // =====================================
  // Payment Status Summary
  // =====================================
  async paymentSummary() {
    return await PurchaseDetail.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: "$paymentStatus",
          total: {
            $sum: 1,
          },
          amount: {
            $sum: "$totalCost",
          },
        },
      },
    ]);
  }

  // =====================================
  // Total Purchase Cost
  // =====================================
  async totalPurchaseCost() {
    const result = await PurchaseDetail.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalCost",
          },
        },
      },
    ]);

    return result.length ? result[0].total : 0;
  }
}

module.exports = new PurchaseDetailRepository();

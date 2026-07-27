const Invoice = require("../../models/assets/Invoice");

class InvoiceRepository {
  // =====================================
  // Create Invoice
  // =====================================
  async create(payload) {
    return await Invoice.create(payload);
  }

  // =====================================
  // Find By Id
  // =====================================
  async findById(id) {
    return await Invoice.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("purchaseDetail")
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email");
  }

  // =====================================
  // Find By Invoice Number
  // =====================================
  async findByInvoiceNumber(invoiceNumber) {
    return await Invoice.findOne({
      invoiceNumber,
      isDeleted: false,
    });
  }

  // =====================================
  // Find By Purchase Detail
  // =====================================
  async findByPurchaseDetail(
    purchaseDetailId,
    { page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = {},
  ) {
    const query = {
      purchaseDetail: purchaseDetailId,
      isDeleted: false,
    };

    const skip = (page - 1) * Number(limit);

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const [data, total] = await Promise.all([
      Invoice.find(query).sort(sort).skip(skip).limit(Number(limit)),

      Invoice.countDocuments(query),
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
  // Find All
  // =====================================
  async findAll({
    page = 1,
    limit = 10,
    search = "",
    invoiceType,
    uploadStatus,
    purchaseDetail,
    sortBy = "createdAt",
    order = "desc",
  }) {
    const query = {
      isDeleted: false,
    };

    if (invoiceType) {
      query.invoiceType = invoiceType;
    }

    if (uploadStatus) {
      query.uploadStatus = uploadStatus;
    }

    if (purchaseDetail) {
      query.purchaseDetail = purchaseDetail;
    }

    if (search) {
      query.$or = [
        {
          invoiceNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          originalName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          fileName: {
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
      Invoice.find(query)
        .populate("purchaseDetail", "purchaseNumber invoiceNumber")
        .populate("createdBy", "firstName lastName")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),

      Invoice.countDocuments(query),
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
    return await Invoice.findOneAndUpdate(
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
    return await Invoice.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy,
        uploadStatus: "DELETED",
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
    return await Invoice.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
        uploadStatus: "UPLOADED",
      },
      {
        returnDocument: "after",
      },
    );
  }

  // =====================================
  // Latest Uploads
  // =====================================
  async latest(limit = 10) {
    return await Invoice.find({
      isDeleted: false,
    })
      .populate("purchaseDetail", "purchaseNumber")
      .populate("createdBy", "firstName lastName")
      .sort({
        createdAt: -1,
      })
      .limit(Number(limit));
  }

  // =====================================
  // Count
  // =====================================
  async count() {
    return await Invoice.countDocuments({
      isDeleted: false,
    });
  }
}

module.exports = new InvoiceRepository();

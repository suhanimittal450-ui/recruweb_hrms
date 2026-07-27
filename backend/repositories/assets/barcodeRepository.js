const Barcode = require("../../models/assets/Barcode");

class BarcodeRepository {
  // =====================================
  // Create
  // =====================================
  async create(payload) {
    return await Barcode.create(payload);
  }

  // =====================================
  // Find By ID
  // =====================================
  async findById(id) {
    return await Barcode.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("asset")
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email");
  }

  // =====================================
  // Find By Asset
  // =====================================
  async findByAsset(assetId) {
    return await Barcode.findOne({
      asset: assetId,
      isDeleted: false,
    }).populate("asset");
  }

  // =====================================
  // Find By Barcode Number
  // =====================================
  async findByBarcodeNumber(barcodeNumber) {
    return await Barcode.findOne({
      barcodeNumber,
      isDeleted: false,
    }).populate("asset");
  }

  // =====================================
  // Get All
  // =====================================
  async findAll({
    page = 1,
    limit = 10,
    search = "",
    status,
    format,
    sortBy = "createdAt",
    order = "desc",
  }) {
    const query = {
      isDeleted: false,
    };

    if (status) query.status = status;
    if (format) query.format = format;

    if (search) {
      query.$or = [
        {
          barcodeNumber: {
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
      Barcode.find(query)
        .populate("asset", "assetCode assetName serialNumber")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),

      Barcode.countDocuments(query),
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
    return await Barcode.findOneAndUpdate(
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
  // Increment Print Count
  // =====================================
  async incrementPrint(id) {
    return await Barcode.findByIdAndUpdate(
      id,
      {
        $inc: {
          printCount: 1,
        },
        lastPrintedAt: new Date(),
      },
      {
        returnDocument: "after",
      },
    );
  }

  // =====================================
  // Increment Download Count
  // =====================================
  async incrementDownload(id) {
    return await Barcode.findByIdAndUpdate(
      id,
      {
        $inc: {
          downloadCount: 1,
        },
        lastDownloadedAt: new Date(),
      },
      {
        returnDocument: "after",
      },
    );
  }

  // =====================================
  // Soft Delete
  // =====================================
  async softDelete(id, deletedBy) {
    return await Barcode.findOneAndUpdate(
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
    return await Barcode.findByIdAndUpdate(
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
    return await Barcode.countDocuments({
      isDeleted: false,
    });
  }

  // =====================================
  // Latest Generated
  // =====================================
  async latest(limit = 10) {
    return await Barcode.find({
      isDeleted: false,
    })
      .populate("asset", "assetCode assetName")
      .sort({
        generatedAt: -1,
      })
      .limit(Number(limit));
  }
}

module.exports = new BarcodeRepository();

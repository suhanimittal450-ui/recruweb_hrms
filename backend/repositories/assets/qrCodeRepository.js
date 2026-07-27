const QRCode = require("../../models/assets/QRCode");

class QRCodeRepository {
  // =====================================
  // Create
  // =====================================
  async create(payload) {
    return await QRCode.create(payload);
  }

  // =====================================
  // Find By ID
  // =====================================
  async findById(id) {
    return await QRCode.findOne({
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
    return await QRCode.findOne({
      asset: assetId,
      isDeleted: false,
    }).populate("asset");
  }

  // =====================================
  // Find By QR Code
  // =====================================
  async findByQRCode(qrCode) {
    return await QRCode.findOne({
      qrCode,
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
    sortBy = "createdAt",
    order = "desc",
  }) {
    const query = {
      isDeleted: false,
    };

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        {
          qrCode: {
            $regex: search,
            $options: "i",
          },
        },
        {
          verificationUrl: {
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
      QRCode.find(query)
        .populate("asset", "assetCode assetName serialNumber")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),

      QRCode.countDocuments(query),
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
    return await QRCode.findOneAndUpdate(
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
  // Increment Scan Count
  // =====================================
  async incrementScan(id) {
    return await QRCode.findByIdAndUpdate(
      id,
      {
        $inc: {
          scanCount: 1,
        },
        lastScannedAt: new Date(),
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
    return await QRCode.findByIdAndUpdate(
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
  // Increment Print Count
  // =====================================
  async incrementPrint(id) {
    return await QRCode.findByIdAndUpdate(
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
  // Soft Delete
  // =====================================
  async softDelete(id, deletedBy) {
    return await QRCode.findOneAndUpdate(
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
    return await QRCode.findByIdAndUpdate(
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
    return await QRCode.countDocuments({
      isDeleted: false,
    });
  }

  // =====================================
  // Latest Generated
  // =====================================
  async latest(limit = 10) {
    return await QRCode.find({
      isDeleted: false,
    })
      .populate("asset", "assetCode assetName")
      .sort({
        generatedAt: -1,
      })
      .limit(Number(limit));
  }
}

module.exports = new QRCodeRepository();

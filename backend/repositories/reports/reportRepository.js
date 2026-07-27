const Report = require("../../models/reports/reportModel");

class ReportRepository {
  // ==========================================
  // Create Report
  // ==========================================
  async create(payload) {
    return Report.create(payload);
  }

  // ==========================================
  // Get Report By ID
  // ==========================================
  async findById(id) {
    return Report.findById(id).populate(
      "generatedBy",
      "firstName lastName email",
    );
  }

  // ==========================================
  // Get All Reports
  // ==========================================
  async findAll(filters = {}) {
    return Report.find(filters)
      .populate("generatedBy", "firstName lastName email")
      .sort({ createdAt: -1 });
  }

  // ==========================================
  // Update Report
  // ==========================================
  async update(id, payload) {
    return Report.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  // ==========================================
  // Update Status
  // ==========================================
  async updateStatus(id, status) {
    return Report.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" },
    );
  }

  // ==========================================
  // Increment Download Count
  // ==========================================
  async incrementDownload(id) {
    return Report.findByIdAndUpdate(
      id,
      {
        $inc: {
          downloadCount: 1,
        },
      },
      {
        returnDocument: "after",
      },
    );
  }

  // ==========================================
  // Soft Delete
  // ==========================================
  async softDelete(id) {
    return Report.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        returnDocument: "after",
      },
    );
  }

  // ==========================================
  // Restore
  // ==========================================
  async restore(id) {
    return Report.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
      },
      {
        returnDocument: "after",
      },
    );
  }

  // ==========================================
  // Count Reports
  // ==========================================
  async count(filters = {}) {
    return Report.countDocuments(filters);
  }

  // ==========================================
  // Latest Reports
  // ==========================================
  async latest(limit = 10) {
    return Report.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .populate("generatedBy", "firstName lastName");
  }

  // ==========================================
  // Report Analytics
  // ==========================================
  async analytics() {
    return Report.aggregate([
      {
        $group: {
          _id: "$reportType",
          totalReports: {
            $sum: 1,
          },
          totalDownloads: {
            $sum: "$downloadCount",
          },
        },
      },
    ]);
  }
}

module.exports = new ReportRepository();

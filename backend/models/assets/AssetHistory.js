const mongoose = require("mongoose");

const assetHistorySchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
      index: true,
    },

    action: {
      type: String,
      required: true,
      enum: [
        "CREATED",
        "UPDATED",
        "ASSIGNED",
        "RETURNED",
        "MAINTENANCE_CREATED",
        "MAINTENANCE_COMPLETED",
        "STATUS_CHANGED",
        "LOCATION_CHANGED",
        "OWNER_CHANGED",
        "DEPRECIATION",
        "BARCODE_GENERATED",
        "QRCODE_GENERATED",
        "SCANNED",
        "DISPOSED",
      ],
    },

    previousValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    newValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    referenceModel: {
      type: String,
      enum: [
        "Asset",
        "AssetAssignment",
        "AssetReturn",
        "AssetMaintenance",
        "Warranty",
        "Vendor",
        "PurchaseDetail",
      ],
    },

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    ipAddress: {
      type: String,
      trim: true,
    },

    deviceInfo: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ==============================
// Indexes
// ==============================

module.exports = mongoose.model("AssetHistory", assetHistorySchema);

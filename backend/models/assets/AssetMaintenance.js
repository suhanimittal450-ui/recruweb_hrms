const mongoose = require("mongoose");

const assetMaintenanceSchema = new mongoose.Schema(
  {
    maintenanceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },

    maintenanceType: {
      type: String,
      enum: ["PREVENTIVE", "CORRECTIVE", "AMC", "CALIBRATION", "INSPECTION"],
      required: true,
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
    },

    status: {
      type: String,
      enum: ["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
      default: "SCHEDULED",
    },

    scheduledDate: {
      type: Date,
      required: true,
    },

    startDate: {
      type: Date,
    },

    completedDate: {
      type: Date,
    },

    cost: {
      type: Number,
      default: 0,
      min: 0,
    },

    downtimeHours: {
      type: Number,
      default: 0,
      min: 0,
    },

    technicianName: {
      type: String,
      trim: true,
    },

    technicianPhone: {
      type: String,
      trim: true,
    },

    serviceReport: {
      type: String,
      trim: true,
      maxlength: 3000,
    },

    invoiceAttachments: [
      {
        fileName: String,
        publicId: String,
        url: String,
      },
    ],

    nextMaintenanceDate: {
      type: Date,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ================================
// Indexes
// ================================

module.exports = mongoose.model("AssetMaintenance", assetMaintenanceSchema);

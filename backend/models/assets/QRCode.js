const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
      unique: true,
      index: true,
    },

    qrCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    verificationUrl: {
      type: String,
      required: true,
      trim: true,
    },

    qrContent: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    publicId: {
      type: String,
      default: "",
    },

    size: {
      type: Number,
      default: 300,
    },

    foregroundColor: {
      type: String,
      default: "#000000",
    },

    backgroundColor: {
      type: String,
      default: "#FFFFFF",
    },

    errorCorrectionLevel: {
      type: String,
      enum: ["L", "M", "Q", "H"],
      default: "H",
    },

    scanCount: {
      type: Number,
      default: 0,
    },

    downloadCount: {
      type: Number,
      default: 0,
    },

    printCount: {
      type: Number,
      default: 0,
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },

    lastScannedAt: {
      type: Date,
      default: null,
    },

    lastDownloadedAt: {
      type: Date,
      default: null,
    },

    lastPrintedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    remarks: {
      type: String,
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

// ======================================
// Indexes
// ======================================

module.exports = mongoose.model("QRCode", qrCodeSchema);

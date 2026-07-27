const mongoose = require("mongoose");

const barcodeSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
      unique: true,
      index: true,
    },

    barcodeNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    format: {
      type: String,
      enum: ["CODE128", "CODE39", "EAN13", "EAN8", "UPC"],
      default: "CODE128",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    publicId: {
      type: String,
      default: "",
    },

    width: {
      type: Number,
      default: 2,
    },

    height: {
      type: Number,
      default: 100,
    },

    displayValue: {
      type: Boolean,
      default: true,
    },

    printCount: {
      type: Number,
      default: 0,
    },

    downloadCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },

    lastPrintedAt: {
      type: Date,
      default: null,
    },

    lastDownloadedAt: {
      type: Date,
      default: null,
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

module.exports = mongoose.model("Barcode", barcodeSchema);

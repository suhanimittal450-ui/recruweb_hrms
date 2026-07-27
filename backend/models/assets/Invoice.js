const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    purchaseDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseDetail",
      required: true,
      index: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      index: true,
    },

    invoiceType: {
      type: String,
      enum: ["PURCHASE", "AMC", "SERVICE", "WARRANTY", "OTHER"],
      default: "PURCHASE",
    },

    version: {
      type: Number,
      default: 1,
    },

    fileName: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    extension: {
      type: String,
    },

    size: {
      type: Number,
      required: true,
    },

    cloudinary: {
      publicId: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },

      secureUrl: {
        type: String,
        required: true,
      },

      folder: {
        type: String,
      },
    },

    uploadStatus: {
      type: String,
      enum: ["UPLOADED", "REPLACED", "DELETED"],
      default: "UPLOADED",
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

module.exports = mongoose.model("Invoice", invoiceSchema);

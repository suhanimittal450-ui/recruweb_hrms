const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema(
  {
    assetCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    assetName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssetCategory",
      required: true,
    },

    serialNumber: {
      type: String,
      trim: true,
      default: "",
    },

    barcode: {
      type: String,
      default: "",
    },

    qrCode: {
      type: String,
      default: "",
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },

    purchaseDate: {
      type: Date,
    },

    purchaseCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    currentValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    warrantyExpiry: {
      type: Date,
    },

    location: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "AVAILABLE",
        "ASSIGNED",
        "UNDER_MAINTENANCE",
        "RETIRED",
        "LOST",
        "DAMAGED",
      ],
      default: "AVAILABLE",
    },

    notes: {
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

    deletedAt: Date,

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

AssetSchema.index({
  assetCode: "text",
  assetName: "text",
  serialNumber: "text",
});

module.exports = mongoose.model("Asset", AssetSchema);

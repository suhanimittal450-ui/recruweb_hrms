const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    assetCode: {
      type: String,
      required: true,
      unique: true,
    },

    assetName: {
      type: String,
      required: true,
    },

    category: String,

    brand: String,

    model: String,

    serialNumber: String,

    purchaseDate: Date,

    purchasePrice: Number,

    warrantyExpiry: Date,

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },

    status: {
      type: String,
      enum: ["Available", "Assigned", "Maintenance", "Damaged", "Disposed"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Asset", assetSchema);

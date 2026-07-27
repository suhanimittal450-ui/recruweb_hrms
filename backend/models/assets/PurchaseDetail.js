const mongoose = require("mongoose");

const purchaseDetailSchema = new mongoose.Schema(
  {
    purchaseNumber: {
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
      index: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },

    purchaseOrderNumber: {
      type: String,
      trim: true,
    },

    invoiceNumber: {
      type: String,
      trim: true,
    },

    purchaseDate: {
      type: Date,
      required: true,
    },

    deliveryDate: {
      type: Date,
    },

    purchaseCost: {
      type: Number,
      required: true,
      min: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    shippingCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    installationCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    paymentMethod: {
      type: String,
      enum: ["CASH", "BANK_TRANSFER", "UPI", "CHEQUE", "CARD"],
      default: "BANK_TRANSFER",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PARTIAL", "PAID"],
      default: "PENDING",
    },

    invoice: {
      fileName: String,
      publicId: String,
      url: String,
    },

    warrantyStartDate: {
      type: Date,
    },

    warrantyEndDate: {
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

// ===================================
// Auto Calculate Total Cost
// ===================================

purchaseDetailSchema.pre("save", function (next) {
  this.totalCost =
    this.purchaseCost +
    this.taxAmount +
    this.shippingCost +
    this.installationCost -
    this.discountAmount;

  next();
});

// ===================================
// Indexes
// ===================================

module.exports = mongoose.model("PurchaseDetail", purchaseDetailSchema);

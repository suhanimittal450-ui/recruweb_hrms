const mongoose = require("mongoose");

const WarrantySchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    warrantyNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    warrantyType: {
      type: String,
      enum: ["MANUFACTURER", "EXTENDED", "AMC", "INSURANCE"],
      default: "MANUFACTURER",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    warrantyPeriodMonths: {
      type: Number,
      required: true,
      min: 1,
    },

    coverage: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    termsAndConditions: {
      type: String,
      trim: true,
      maxlength: 3000,
    },

    supportPhone: {
      type: String,
      trim: true,
    },

    supportEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    supportWebsite: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "VOID", "CLAIMED"],
      default: "ACTIVE",
    },

    claimCount: {
      type: Number,
      default: 0,
      min: 0,
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

WarrantySchema.index({
  warrantyNumber: "text",
  status: "text",
});

module.exports = mongoose.model("Warranty", WarrantySchema);

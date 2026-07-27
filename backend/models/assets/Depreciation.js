const mongoose = require("mongoose");

const depreciationSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
      index: true,
    },

    purchaseDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseDetail",
      required: true,
      index: true,
    },

    method: {
      type: String,
      enum: [
        "SLM", // Straight Line Method
        "WDV", // Written Down Value
        "DECLINING_BALANCE",
      ],
      default: "SLM",
    },

    purchaseCost: {
      type: Number,
      required: true,
      min: 0,
    },

    salvageValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    usefulLifeYears: {
      type: Number,
      required: true,
      min: 1,
    },

    depreciationRate: {
      type: Number,
      required: true,
      min: 0,
    },

    annualDepreciation: {
      type: Number,
      default: 0,
    },

    monthlyDepreciation: {
      type: Number,
      default: 0,
    },

    accumulatedDepreciation: {
      type: Number,
      default: 0,
    },

    currentBookValue: {
      type: Number,
      default: 0,
    },

    depreciationStartDate: {
      type: Date,
      required: true,
    },

    lastCalculatedDate: {
      type: Date,
    },

    nextCalculationDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED", "STOPPED"],
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

// =====================================
// Auto Calculation (SLM)
// =====================================

depreciationSchema.pre("save", function (next) {
  if (this.method === "SLM") {
    this.annualDepreciation =
      (this.purchaseCost - this.salvageValue) / this.usefulLifeYears;

    this.monthlyDepreciation = this.annualDepreciation / 12;

    this.currentBookValue = this.purchaseCost - this.accumulatedDepreciation;
  }

  next();
});

// =====================================
// Indexes
// =====================================

module.exports = mongoose.model("Depreciation", depreciationSchema);

const mongoose = require("mongoose");

const advanceSalarySchema = new mongoose.Schema(
  {
    advanceNumber: {
      type: String,
      unique: true,
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    reason: {
      type: String,
      trim: true,
    },

    month: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    deductionMonths: {
      type: Number,
      default: 1,
      min: 1,
    },

    monthlyDeduction: {
      type: Number,
      default: 0,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    remainingAmount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Active", "Closed"],
      default: "Pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: Date,

    rejectionReason: String,

    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("AdvanceSalary", advanceSalarySchema);

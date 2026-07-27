const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    loanNumber: {
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

    tenureMonths: {
      type: Number,
      required: true,
      min: 1,
    },

    monthlyInstallment: {
      type: Number,
      required: true,
    },

    disbursedAmount: {
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

    startMonth: {
      type: Number,
    },

    startYear: {
      type: Number,
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

module.exports = mongoose.model("Loan", loanSchema);

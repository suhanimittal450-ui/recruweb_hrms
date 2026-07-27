const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    salaryStructure: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalaryStructure",
      required: true,
    },

    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    year: {
      type: Number,
      required: true,
    },

    workingDays: {
      type: Number,
      default: 0,
    },

    presentDays: {
      type: Number,
      default: 0,
    },

    leaveDays: {
      type: Number,
      default: 0,
    },

    absentDays: {
      type: Number,
      default: 0,
    },

    overtimeHours: {
      type: Number,
      default: 0,
    },

    grossSalary: {
      type: Number,
      default: 0,
    },

    totalDeduction: {
      type: Number,
      default: 0,
    },

    netSalary: {
      type: Number,
      default: 0,
    },

    // =====================================
    // Payroll Approval Workflow Status
    // Draft(Pending) -> Processed -> Approved -> Paid -> Archived
    // Rejected is a terminal branch from Processed/Approved
    // "Generated" kept for backward compatibility with existing data
    // =====================================
    status: {
      type: String,
      enum: [
        "Pending",
        "Generated",
        "Processed",
        "Approved",
        "Rejected",
        "Paid",
        "Archived",
      ],
      default: "Pending",
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // -----------------------------
    // Processed Stage
    // -----------------------------
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    processedDate: {
      type: Date,
    },

    // -----------------------------
    // Approved Stage
    // -----------------------------
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedDate: {
      type: Date,
    },

    // -----------------------------
    // Rejected Stage
    // -----------------------------
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    rejectedDate: {
      type: Date,
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    // -----------------------------
    // Paid Stage
    // -----------------------------
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    paidDate: {
      type: Date,
    },

    // -----------------------------
    // Archived Stage
    // -----------------------------
    archivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    archivedDate: {
      type: Date,
    },

    payslip: {
      type: String,
      default: "",
    },

    remarks: {
      type: String,
      default: "",
    },

    timeline: [
      {
        action: String,

        by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        remarks: {
          type: String,
          default: "",
        },

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate payroll for same employee/month/year
payrollSchema.index(
  {
    employee: 1,
    month: 1,
    year: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("Payroll", payrollSchema);

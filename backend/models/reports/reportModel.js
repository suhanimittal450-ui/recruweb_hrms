const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportName: {
      type: String,
      required: true,
      trim: true,
    },

    reportType: {
      type: String,
      enum: [
        "ASSET",
        "INVENTORY",
        "PURCHASE",
        "INVOICE",
        "VENDOR",
        "WARRANTY",
        "MAINTENANCE",
        "ASSIGNMENT",
        "RETURN",
        "FINANCIAL",
      ],
      required: true,
    },

    format: {
      type: String,
      enum: ["PDF", "EXCEL", "CSV"],
      required: true,
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: String,

    fileUrl: String,

    fileSize: Number,

    filters: {
      type: Object,
      default: {},
    },

    emailRecipients: [
      {
        type: String,
      },
    ],

    emailed: {
      type: Boolean,
      default: false,
    },

    schedule: {
      enabled: {
        type: Boolean,
        default: false,
      },

      frequency: {
        type: String,
        enum: ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"],
      },

      nextRun: Date,
    },

    status: {
      type: String,
      enum: ["PENDING", "GENERATING", "COMPLETED", "FAILED"],
      default: "PENDING",
    },

    downloadCount: {
      type: Number,
      default: 0,
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },

    remarks: String,

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

reportSchema.index({ reportType: 1 });
reportSchema.index({ generatedBy: 1 });
reportSchema.index({ status: 1 });

module.exports = mongoose.model("Report", reportSchema);

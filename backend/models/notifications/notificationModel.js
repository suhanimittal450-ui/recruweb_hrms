const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    type: {
      type: String,
      enum: [
        "INFO",
        "SUCCESS",
        "WARNING",
        "ERROR",
        "REMINDER",
        "ANNOUNCEMENT",
        "SYSTEM",
        "PAYROLL",
        "LEAVE",
        "ATTENDANCE",
        "ASSET",
      ],
      default: "INFO",
    },

    category: {
      type: String,
      enum: [
        "GENERAL",
        "HR",
        "PAYROLL",
        "ATTENDANCE",
        "LEAVE",
        "ASSET",
        "RECRUITMENT",
        "SYSTEM",
      ],
      default: "GENERAL",
    },

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
    },

    channels: [
      {
        type: String,
        enum: ["IN_APP", "EMAIL", "SMS", "PUSH"],
      },
    ],

    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    actionUrl: {
      type: String,
      trim: true,
    },

    icon: {
      type: String,
      default: "bell",
    },

    color: {
      type: String,
      default: "#0d6efd",
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    readAt: {
      type: Date,
    },

    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },

    archivedAt: {
      type: Date,
    },

    expiresAt: {
      type: Date,
      index: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SENT", "FAILED"],
      default: "PENDING",
      index: true,
    },

    emailSent: {
      type: Boolean,
      default: false,
    },

    pushSent: {
      type: Boolean,
      default: false,
    },

    smsSent: {
      type: Boolean,
      default: false,
    },

    metadata: {
      ip: String,
      device: String,
      browser: String,
      os: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// =========================
// Compound Indexes
// =========================
notificationSchema.index({
  recipient: 1,
  isRead: 1,
});

notificationSchema.index({
  recipient: 1,
  createdAt: -1,
});

notificationSchema.index({
  category: 1,
  priority: 1,
});

notificationSchema.index({
  status: 1,
  createdAt: -1,
});

module.exports = mongoose.model("Notification", notificationSchema);

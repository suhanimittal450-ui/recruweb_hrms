const mongoose = require("mongoose");

const activityTimelineSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      required: true,
      enum: [
        "EMPLOYEE",
        "CANDIDATE",
        "ASSET",
        "LEAVE",
        "PAYROLL",
        "ATTENDANCE",
        "VENDOR",
        "PURCHASE",
        "INVOICE",
        "USER",
        "RECRUITMENT",
        "TASK",
        "TICKET",
      ],
      index: true,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    action: {
      type: String,
      required: true,
      index: true,
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

activityTimelineSchema.index({
  entityType: 1,
  entityId: 1,
  createdAt: -1,
});

module.exports = mongoose.model("ActivityTimeline", activityTimelineSchema);

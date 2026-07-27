const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    module: {
      type: String,
      required: true,
      index: true,
    },

    action: {
      type: String,
      required: true,
      index: true,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    entityName: {
      type: String,
    },

    oldData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    newData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    ipAddress: String,

    method: String,

    endpoint: String,

    browser: String,

    device: String,

    os: String,

    statusCode: Number,

    responseTime: Number,

    success: {
      type: Boolean,
      default: true,
    },

    remarks: String,

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

auditLogSchema.index({
  module: 1,
  action: 1,
});

auditLogSchema.index({
  user: 1,
  createdAt: -1,
});

auditLogSchema.index({
  endpoint: 1,
});

module.exports = mongoose.model("AuditLog", auditLogSchema);

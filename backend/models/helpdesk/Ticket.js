const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["IT", "HR", "Finance", "Facilities", "Payroll", "Other"],
      default: "Other",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Open", "InProgress", "OnHold", "Resolved", "Closed"],
      default: "Open",
      index: true,
    },

    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    // SLA — first-response / resolution target, defaulted by priority in the service layer.
    slaDueAt: Date,

    resolvedAt: Date,
    closedAt: Date,

    resolutionNotes: String,

    attachments: [
      {
        fileUrl: { type: String, required: true },
        originalName: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    replies: [
      {
        text: { type: String, required: true },
        by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        isInternalNote: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

ticketSchema.index({ subject: "text", description: "text" });

module.exports = mongoose.model("Ticket", ticketSchema);

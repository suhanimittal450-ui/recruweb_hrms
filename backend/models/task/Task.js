const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["ToDo", "InProgress", "Review", "Done", "Cancelled"],
      default: "ToDo",
      index: true,
    },

    dueDate: Date,

    completedAt: Date,

    tags: [String],

    attachments: [
      {
        fileUrl: { type: String, required: true },
        originalName: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    comments: [
      {
        text: { type: String, required: true },
        by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
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

taskSchema.index({ assignedTo: 1, status: 1 });
taskSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Task", taskSchema);

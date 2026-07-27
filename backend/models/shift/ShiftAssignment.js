const mongoose = require("mongoose");

const shiftAssignmentSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    shift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
    },

    // -----------------------------
    // Effective Date Range
    // effectiveTo = null means the assignment is open-ended (ongoing)
    // -----------------------------
    effectiveFrom: {
      type: Date,
      required: true,
    },

    effectiveTo: {
      type: Date,
      default: null,
    },

    // -----------------------------
    // Weekly Off
    // -----------------------------
    weeklyOffDays: {
      type: [String],
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      default: ["Sunday"],
    },

    // -----------------------------
    // Rotational Shift
    // -----------------------------
    isRotational: {
      type: Boolean,
      default: false,
    },

    rotationCycleDays: {
      type: Number,
      default: null,
    },

    rotationGroup: {
      type: String,
      default: null,
      // Groups multiple ShiftAssignment segments that together
      // form a single rotation schedule for an employee
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["Active", "Ended"],
      default: "Active",
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

        remarks: String,

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

shiftAssignmentSchema.index({ employee: 1, status: 1 });
shiftAssignmentSchema.index({ shift: 1, status: 1 });

module.exports = mongoose.model("ShiftAssignment", shiftAssignmentSchema);

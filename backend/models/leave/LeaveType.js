const mongoose = require("mongoose");

const leaveTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Leave type name is required"],
      unique: true,
      trim: true,
    },

    code: {
      type: String,
      required: [true, "Leave code is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },

    totalDays: {
      type: Number,
      required: [true, "Total leave days are required"],
      min: 0,
    },

    paid: {
      type: Boolean,
      default: true,
    },

    carryForward: {
      type: Boolean,
      default: false,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("LeaveType", leaveTypeSchema);

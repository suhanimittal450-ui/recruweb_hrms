const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    shiftName: {
      type: String,
      required: true,
      unique: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    graceMinutes: {
      type: Number,
      default: 15,
    },

    workingHours: {
      type: Number,
      default: 8,
    },

    isNightShift: {
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

module.exports = mongoose.model("Shift", shiftSchema);

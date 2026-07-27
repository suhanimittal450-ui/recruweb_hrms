const mongoose = require("mongoose");

// ==========================================
// Break Schema
// ==========================================
const breakSchema = new mongoose.Schema(
  {
    breakIn: {
      type: Date,
      required: true,
    },

    breakOut: {
      type: Date,
      default: null,
    },

    durationMinutes: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

// ==========================================
// Attendance Schema
// ==========================================
const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    // Clock In / Out
    clockIn: {
      type: Date,
      default: null,
    },

    clockOut: {
      type: Date,
      default: null,
    },

    // Attendance Status
    status: {
      type: String,
      enum: ["Present", "Absent", "Half Day", "Late", "Leave"],
      default: "Present",
    },

    late: {
      type: Boolean,
      default: false,
    },

    halfDay: {
      type: Boolean,
      default: false,
    },

    // Breaks
    breaks: [breakSchema],

    totalBreakMinutes: {
      type: Number,
      default: 0,
    },

    // Working Time
    workingMinutes: {
      type: Number,
      default: 0,
    },

    netWorkingMinutes: {
      type: Number,
      default: 0,
    },

    workingHours: {
      type: Number,
      default: 0,
    },

    netWorkingHours: {
      type: Number,
      default: 0,
    },

    overtimeHours: {
      type: Number,
      default: 0,
    },

    // Tracking
    location: {
      type: String,
      default: "",
    },

    device: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// ==========================================
// Prevent Duplicate Attendance
// ==========================================
attendanceSchema.index(
  {
    employee: 1,
    date: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("Attendance", attendanceSchema);

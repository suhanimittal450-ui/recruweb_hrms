const mongoose = require("mongoose");

const leaveBalanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee is required"],
    },

    leaveType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LeaveType",
      required: [true, "Leave type is required"],
    },

    allocated: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    used: {
      type: Number,
      default: 0,
      min: 0,
    },

    remaining: {
      type: Number,
      default: 0,
      min: 0,
    },

    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// One balance record per employee + leave type + year
leaveBalanceSchema.index(
  { employee: 1, leaveType: 1, year: 1 },
  { unique: true },
);

// Automatically calculate remaining balance
leaveBalanceSchema.pre("save", function (next) {
  this.remaining = this.allocated - this.used;

  if (this.remaining < 0) {
    this.remaining = 0;
  }

  next();
});

module.exports = mongoose.model("LeaveBalance", leaveBalanceSchema);

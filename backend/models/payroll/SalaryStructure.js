const mongoose = require("mongoose");

const salaryStructureSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
    },

    basicSalary: {
      type: Number,
      required: true,
      default: 0,
    },

    hra: {
      type: Number,
      default: 0,
    },

    specialAllowance: {
      type: Number,
      default: 0,
    },

    bonus: {
      type: Number,
      default: 0,
    },

    pf: {
      type: Number,
      default: 0,
    },

    esi: {
      type: Number,
      default: 0,
    },

    professionalTax: {
      type: Number,
      default: 0,
    },

    incomeTax: {
      type: Number,
      default: 0,
    },

    loanDeduction: {
      type: Number,
      default: 0,
    },

    otherDeduction: {
      type: Number,
      default: 0,
    },

    grossSalary: {
      type: Number,
      default: 0,
    },

    netSalary: {
      type: Number,
      default: 0,
    },

    effectiveFrom: {
      type: Date,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },

    timeline: [
      {
        action: String,
        by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
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

module.exports = mongoose.model("SalaryStructure", salaryStructureSchema);

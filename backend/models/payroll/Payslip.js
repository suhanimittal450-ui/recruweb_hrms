const mongoose = require("mongoose");

const payslipSchema = new mongoose.Schema({
  payroll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payroll",
    required: true,
  },

  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },

  pdfUrl: String,

  generatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payslip", payslipSchema);

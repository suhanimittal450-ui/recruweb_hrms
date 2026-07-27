const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
    },

    openings: {
      type: Number,
      default: 1,
    },

    description: String,

    status: {
      type: String,
      enum: ["Open", "Closed", "On Hold"],
      default: "Open",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", jobSchema);

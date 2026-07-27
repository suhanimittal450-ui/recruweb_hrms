const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema(
  {
    designationName: {
      type: String,
      required: true,
      trim: true,
    },

    designationCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    level: {
      type: Number,
      default: 1,
    },

    description: String,

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Designation", designationSchema);

const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    branchName: {
      type: String,
      required: true,
      trim: true,
    },

    branchCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    address: String,

    city: String,

    state: String,

    country: String,

    phone: String,

    email: String,

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Branch", branchSchema);

const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    companyCode: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
    },

    email: String,

    phone: String,

    website: String,

    address: String,

    city: String,

    state: String,

    country: String,

    pincode: String,

    logo: String,

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Company", companySchema);

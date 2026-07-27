const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ["National", "Festival", "Company", "Optional"],
      default: "National",
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

module.exports = mongoose.model("Holiday", holidaySchema);

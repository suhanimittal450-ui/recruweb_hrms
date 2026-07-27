const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    keyword: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    module: {
      type: String,
      enum: [
        "EMPLOYEE",
        "CANDIDATE",
        "ASSET",
        "LEAVE",
        "PAYROLL",
        "ATTENDANCE",
        "VENDOR",
        "PURCHASE",
        "INVOICE",
        "NOTIFICATION",
        "GLOBAL",
      ],
      default: "GLOBAL",
      index: true,
    },

    totalResults: {
      type: Number,
      default: 0,
    },

    ipAddress: String,

    browser: String,
  },
  {
    timestamps: true,
  },
);

searchHistorySchema.index({
  user: 1,
  createdAt: -1,
});

module.exports = mongoose.model("SearchHistory", searchHistorySchema);

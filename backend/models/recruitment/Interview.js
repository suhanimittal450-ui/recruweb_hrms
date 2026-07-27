const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },

    interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    date: Date,

    feedback: String,

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Interview", interviewSchema);

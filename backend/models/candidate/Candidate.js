const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    candidateId: {
      type: String,
      unique: true,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },

    source: {
      type: String,
      enum: [
        "Website",
        "LinkedIn",
        "Naukri",
        "Referral",
        "Walk-In",
        "Indeed",
        "Other",
      ],
      default: "Website",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
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

    status: {
      type: String,
      enum: [
        "Applied",
        "HR Review",
        "Interview Scheduled",
        "Interview Cleared",
        "Manager Approved",
        "Offer Sent",
        "Offer Accepted",
        "Joining Pending",
        "Joined",
        "Rejected",
      ],
      default: "Applied",
    },

    resume: String,

    remarks: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Candidate", candidateSchema);

const mongoose = require("mongoose");

const AssetAssignmentSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignmentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    expectedReturnDate: {
      type: Date,
    },

    actualReturnDate: {
      type: Date,
    },

    assignmentStatus: {
      type: String,
      enum: ["ASSIGNED", "RETURNED", "OVERDUE", "LOST", "DAMAGED"],
      default: "ASSIGNED",
    },

    issuedCondition: {
      type: String,
      enum: ["NEW", "GOOD", "FAIR", "DAMAGED"],
      default: "GOOD",
    },

    returnedCondition: {
      type: String,
      enum: ["NEW", "GOOD", "FAIR", "DAMAGED"],
    },

    acknowledgement: {
      type: Boolean,
      default: false,
    },

    acknowledgementDate: {
      type: Date,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: Date,

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("AssetAssignment", AssetAssignmentSchema);

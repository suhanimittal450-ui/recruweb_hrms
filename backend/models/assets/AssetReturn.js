const mongoose = require("mongoose");

const AssetReturnSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssetAssignment",
      required: true,
    },

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

    returnedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    returnDate: {
      type: Date,
      default: Date.now,
      required: true,
    },

    returnCondition: {
      type: String,
      enum: ["NEW", "GOOD", "FAIR", "DAMAGED", "LOST"],
      default: "GOOD",
    },

    damageDescription: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    penaltyAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    attachments: [
      {
        fileName: String,
        publicId: String,
        url: String,
      },
    ],

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

module.exports = mongoose.model("AssetReturn", AssetReturnSchema);

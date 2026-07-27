const mongoose = require("mongoose");

const AssetCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 100,
    },

    code: {
      type: String,
      required: true,
      uppercase: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    depreciationRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    usefulLifeYears: {
      type: Number,
      default: 5,
      min: 1,
    },

    color: {
      type: String,
      default: "#2563eb",
    },

    icon: {
      type: String,
      default: "package",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
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

AssetCategorySchema.index({ name: "text", code: "text" });

module.exports = mongoose.model("AssetCategory", AssetCategorySchema);

const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
  {
    vendorCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    vendorName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    contactPerson: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    alternatePhone: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    gstNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },

    panNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },

    address: {
      line1: {
        type: String,
        trim: true,
      },
      line2: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
        default: "India",
      },
      postalCode: {
        type: String,
        trim: true,
      },
    },

    paymentTerms: {
      type: String,
      trim: true,
      default: "Net 30",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "BLACKLISTED"],
      default: "ACTIVE",
    },

    notes: {
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

VendorSchema.index({
  vendorCode: "text",
  vendorName: "text",
  contactPerson: "text",
  email: "text",
});

module.exports = mongoose.model("Vendor", VendorSchema);

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
    },

    reportingManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    confirmationDate: Date,

    employmentType: {
      type: String,
      enum: ["Permanent", "Contract", "Intern", "Consultant"],
      default: "Permanent",
    },

    probationMonths: {
      type: Number,
      default: 6,
    },

    salary: {
      type: Number,
      default: 0,
    },

    bankDetails: {
      accountHolder: String,
      accountNumber: String,
      bankName: String,
      ifscCode: String,
    },

    emergencyContact: {
      name: String,
      relation: String,
      phone: String,
    },

    address: {
      currentAddress: String,
      permanentAddress: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },

    // Each uploaded document (resume, Aadhaar, PAN, offer letter, etc.) with
    // its own verification status — added to support the document
    // upload/verify workflow (previously this was just flat strings with no
    // verification tracking at all).
    documents: [
      {
        type: {
          type: String,
          enum: ["Resume", "Aadhaar", "PAN", "OfferLetter", "JoiningLetter", "ExperienceLetter", "Other"],
          required: true,
        },
        fileUrl: { type: String, required: true },
        originalName: String,
        status: {
          type: String,
          enum: ["Pending", "Verified", "Rejected"],
          default: "Pending",
        },
        remarks: String,
        uploadedAt: { type: Date, default: Date.now },
        verifiedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        verifiedAt: Date,
      },
    ],

    // Simple onboarding checklist, seeded with default steps when the
    // Employee record is created (see employeeService.createEmployee).
    onboarding: [
      {
        task: { type: String, required: true },
        completed: { type: Boolean, default: false },
        completedAt: Date,
      },
    ],
    shift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave", "Resigned", "Terminated"],
      default: "Active",
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Employee", employeeSchema);

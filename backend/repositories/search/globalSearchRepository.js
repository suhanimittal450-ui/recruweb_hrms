const Employee = require("../../models/employee/Employee");
const Candidate = require("../../models/candidate/Candidate");
const Asset = require("../../models/assets/Asset");
const Vendor = require("../../models/assets/Vendor");
const Leave = require("../../models/leave/Leave");
const Attendance = require("../../models/attendance/Attendance");
const Payroll = require("../../models/payroll/Payroll");
const Invoice = require("../../models/assets/Invoice");
const PurchaseDetail = require("../../models/assets/PurchaseDetail");
const searchHelper = require("../../helpers/searchHelper");

class GlobalSearchRepository {
  // ===============================
  // Generic Search
  // ===============================

  async search(model, filter, options = {}) {
    const {
      page = 1,
      limit = 10,
      sort = searchHelper.getSort("-createdAt"),
      populate = "",
    } = options;
    const { skip, limit: pageLimit } = searchHelper.getPagination(page, limit);

    const query = model.find(filter);

    if (populate) {
      query.populate(populate);
    }

    const data = await query.sort(sort).skip(skip).limit(pageLimit).lean();

    const total = await model.countDocuments(filter);

    return {
      data,
      total,
      page,
      limit: pageLimit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ===============================
  // Employee Search
  // ===============================
  async searchEmployees(keyword, options) {
    const regex = searchHelper.createRegex(keyword);

    const filter = {
      $or: [
        { firstName: regex },

        { lastName: regex },

        { email: regex },

        { employeeId: regex },
      ],
    };

    return this.search(Employee, filter, options);
  }

  // ===============================
  // Candidate Search
  // ===============================

  async searchCandidates(keyword, options) {
    const regex = searchHelper.createRegex(keyword);

    const filter = {
      $or: [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { phone: regex },
      ],
    };

    return this.search(Candidate, filter, options);
  }

  // ===============================
  // Asset Search
  // ===============================

  async searchAssets(keyword, options) {
    const regex = searchHelper.createRegex(keyword);
    const filter = {
      $or: [
        { assetName: regex },
        { assetCode: regex },
        { serialNumber: regex },
      ],
    };

    return this.search(Asset, filter, options);
  }

  // ===============================
  // Vendor Search
  // ===============================

  async searchVendors(keyword, options) {
    const regex = searchHelper.createRegex(keyword);
    const filter = {
      $or: [
        { name: regex },
        { companyName: regex },
        { email: regex },
        { phone: regex },
      ],
    };

    return this.search(Vendor, filter, options);
  }

  // ===============================
  // Leave Search
  // ===============================

  async searchLeaves(keyword, options) {
    const regex = searchHelper.createRegex(keyword);
    const filter = {
      $or: [{ reason: regex }, { status: regex }],
    };

    return this.search(Leave, filter, options);
  }

  // ===============================
  // Attendance Search
  // ===============================

  async searchAttendance(keyword, options) {
    const regex = searchHelper.createRegex(keyword);
    const filter = {
      $or: [{ status: regex }],
    };

    return this.search(Attendance, filter, options);
  }

  // ===============================
  // Payroll Search
  // ===============================

  async searchPayroll(keyword, options) {
    const regex = searchHelper.createRegex(keyword);
    const filter = {
      $or: [{ payrollMonth: regex }, { status: regex }],
    };

    return this.search(Payroll, filter, options);
  }

  // ===============================
  // Invoice Search
  // ===============================

  async searchInvoices(keyword, options) {
    const regex = searchHelper.createRegex(keyword);
    const filter = {
      $or: [{ invoiceNumber: regex }],
    };

    return this.search(Invoice, filter, options);
  }

  // ===============================
  // Purchase Search
  // ===============================

  async searchPurchases(keyword, options) {
    const regex = searchHelper.createRegex(keyword);
    const filter = {
      $or: [{ purchaseNumber: regex }],
    };

    return this.search(PurchaseDetail, filter, options);
  }

  // ===============================
  // Universal Search
  // ===============================

  async globalSearch(keyword, options) {
    const [
      employees,
      candidates,
      assets,
      vendors,
      leaves,
      attendance,
      payroll,
      invoices,
      purchases,
    ] = await Promise.all([
      this.searchEmployees(keyword, options),
      this.searchCandidates(keyword, options),
      this.searchAssets(keyword, options),
      this.searchVendors(keyword, options),
      this.searchLeaves(keyword, options),
      this.searchAttendance(keyword, options),
      this.searchPayroll(keyword, options),
      this.searchInvoices(keyword, options),
      this.searchPurchases(keyword, options),
    ]);

    return {
      employees,

      candidates,

      assets,

      vendors,

      leaves,

      attendance,

      payroll,

      invoices,

      purchases,
    };
  }
}

module.exports = new GlobalSearchRepository();

const Payroll = require("../../models/payroll/Payroll");

class PayrollRepository {
  // =====================================
  // Create Payroll
  // =====================================
  async create(data) {
    return await Payroll.create(data);
  }

  // =====================================
  // Find Payroll By Id (populated)
  // =====================================
  async findById(id) {
    return await Payroll.findById(id)
      .populate("employee")
      .populate("salaryStructure")
      .populate("generatedBy", "firstName lastName email")
      .populate("processedBy", "firstName lastName email")
      .populate("approvedBy", "firstName lastName email")
      .populate("rejectedBy", "firstName lastName email")
      .populate("paidBy", "firstName lastName email")
      .populate("archivedBy", "firstName lastName email")
      .populate("timeline.by", "firstName lastName email");
  }

  // =====================================
  // Find Payroll By Id (raw, no populate)
  // Used internally by service for workflow status checks
  // =====================================
  async findRawById(id) {
    return await Payroll.findById(id);
  }

  // =====================================
  // Find Employee Payrolls
  // =====================================
  async findByEmployee(employeeId) {
    return await Payroll.find({
      employee: employeeId,
    })
      .populate("salaryStructure")
      .populate("generatedBy", "firstName lastName email")
      .sort({
        year: -1,
        month: -1,
      });
  }

  // =====================================
  // Find Payroll By Employee + Month
  // =====================================
  async findByEmployeeMonth(employeeId, month, year) {
    return await Payroll.findOne({
      employee: employeeId,
      month,
      year,
    })
      .populate("salaryStructure")
      .populate("generatedBy", "firstName lastName email");
  }

  // =====================================
  // Update Payroll
  // =====================================
  async update(id, data) {
    return await Payroll.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  // =====================================
  // Push Timeline Entry + Update Fields
  // =====================================
  async updateWithTimeline(id, updateFields, timelineEntry) {
    return await Payroll.findByIdAndUpdate(
      id,
      {
        $set: updateFields,
        $push: {
          timeline: timelineEntry,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    )
      .populate("employee")
      .populate("salaryStructure")
      .populate("generatedBy", "firstName lastName email")
      .populate("processedBy", "firstName lastName email")
      .populate("approvedBy", "firstName lastName email")
      .populate("rejectedBy", "firstName lastName email")
      .populate("paidBy", "firstName lastName email")
      .populate("archivedBy", "firstName lastName email")
      .populate("timeline.by", "firstName lastName email");
  }

  // =====================================
  // Delete Payroll
  // =====================================
  async delete(id) {
    return await Payroll.findByIdAndDelete(id);
  }

  // =====================================
  // Get All Payrolls
  // =====================================
  async findAll(filter = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = options;

    const skip = (page - 1) * limit;

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const payrolls = await Payroll.find(filter)
      .populate("employee")
      .populate("salaryStructure")
      .populate("generatedBy", "firstName lastName email")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Payroll.countDocuments(filter);

    return {
      payrolls,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  // =====================================
  // Find All By Status (used for approval queues)
  // =====================================
  async findAllByStatus(status, options = {}) {
    return this.findAll({ status }, options);
  }

  // =====================================
  // Dashboard Statistics
  // =====================================
  async dashboard() {
    const totalPayroll = await Payroll.countDocuments();

    const paid = await Payroll.countDocuments({
      status: "Paid",
    });

    const pending = await Payroll.countDocuments({
      status: "Pending",
    });

    const generated = await Payroll.countDocuments({
      status: "Generated",
    });

    const processed = await Payroll.countDocuments({
      status: "Processed",
    });

    const approved = await Payroll.countDocuments({
      status: "Approved",
    });

    const rejected = await Payroll.countDocuments({
      status: "Rejected",
    });

    const archived = await Payroll.countDocuments({
      status: "Archived",
    });

    const totalNetSalary = await Payroll.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$netSalary",
          },
        },
      },
    ]);

    return {
      totalPayroll,
      paid,
      pending,
      generated,
      processed,
      approved,
      rejected,
      archived,
      totalNetSalary: totalNetSalary.length > 0 ? totalNetSalary[0].total : 0,
    };
  }

  // =====================================
  // Payroll Analytics
  // =====================================
  async analytics() {
    const payrolls = await Payroll.find();

    const totalSalary = payrolls.reduce(
      (sum, item) => sum + (item.netSalary || 0),
      0,
    );

    const totalDeduction = payrolls.reduce(
      (sum, item) => sum + (item.totalDeductions || 0),
      0,
    );

    const averageSalary =
      payrolls.length > 0 ? totalSalary / payrolls.length : 0;

    return {
      totalPayroll: payrolls.length,
      totalSalary,
      totalDeduction,
      averageSalary,
    };
  }
}

module.exports = new PayrollRepository();

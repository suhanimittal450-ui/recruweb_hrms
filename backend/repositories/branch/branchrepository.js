const Branch = require("../../models/master/Branch");

class BranchRepository {
  async create(data) {
    return Branch.create(data);
  }

  async findAll(filter = {}) {
    return Branch.find(filter)
      .populate("company", "companyName companyCode")
      .sort({ branchName: 1 });
  }

  async findById(id) {
    return Branch.findById(id).populate("company", "companyName companyCode");
  }

  async findByCode(branchCode) {
    return Branch.findOne({ branchCode: branchCode?.toUpperCase() });
  }

  async findByCompany(companyId) {
    return Branch.find({ company: companyId }).sort({ branchName: 1 });
  }

  async update(id, data) {
    return Branch.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async delete(id) {
    return Branch.findByIdAndDelete(id);
  }
}

module.exports = new BranchRepository();

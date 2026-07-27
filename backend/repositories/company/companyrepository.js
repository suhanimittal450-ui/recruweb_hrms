const Company = require("../../models/master/Company");

class CompanyRepository {
  async create(data) {
    return Company.create(data);
  }

  async findAll(filter = {}) {
    return Company.find(filter).sort({ companyName: 1 });
  }

  async findById(id) {
    return Company.findById(id);
  }

  async findByCode(companyCode) {
    return Company.findOne({ companyCode: companyCode?.toUpperCase() });
  }

  async update(id, data) {
    return Company.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async delete(id) {
    return Company.findByIdAndDelete(id);
  }
}

module.exports = new CompanyRepository();

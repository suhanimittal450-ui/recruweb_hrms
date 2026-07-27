const Holiday = require("../../models/holiday/Holiday");

class HolidayRepository {
  async create(data) {
    return Holiday.create(data);
  }

  async findAll() {
    return Holiday.find().sort({
      date: 1,
    });
  }

  async findById(id) {
    return Holiday.findById(id);
  }

  async update(id, data) {
    return Holiday.findByIdAndUpdate(id, data, {
returnDocument: "after",      runValidators: true,
    });
  }

  async delete(id) {
    return Holiday.findByIdAndDelete(id);
  }
}

module.exports = new HolidayRepository();

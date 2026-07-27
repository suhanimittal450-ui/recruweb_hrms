const Shift = require("../../models/shift/Shift");

class ShiftRepository {
  async create(data) {
    return Shift.create(data);
  }

  async findAll() {
    return Shift.find();
  }

  async findById(id) {
    return Shift.findById(id);
  }

  async update(id, data) {
    return Shift.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async delete(id) {
    return Shift.findByIdAndDelete(id);
  }
}

module.exports = new ShiftRepository();

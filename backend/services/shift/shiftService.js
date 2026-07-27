const shiftRepository = require("../../repositories/shift/shiftRepository");

class ShiftService {
  async createShift(data) {
    return shiftRepository.create(data);
  }

  async getAllShifts() {
    return shiftRepository.findAll();
  }

  async updateShift(id, data) {
    return shiftRepository.update(id, data);
  }

  async deleteShift(id) {
    return shiftRepository.delete(id);
  }
}

module.exports = new ShiftService();

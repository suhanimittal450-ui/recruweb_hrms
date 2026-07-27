const holidayRepository = require("../../repositories/holiday/holidayRepository");

class HolidayService {
  async createHoliday(data) {
    return holidayRepository.create(data);
  }

  async getAllHolidays() {
    return holidayRepository.findAll();
  }

  async updateHoliday(id, data) {
    return holidayRepository.update(id, data);
  }

  async deleteHoliday(id) {
    return holidayRepository.delete(id);
  }
}

module.exports = new HolidayService();

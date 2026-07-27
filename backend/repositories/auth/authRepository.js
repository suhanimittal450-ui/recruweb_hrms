const Role = require("../../models/auth/Role");
const User = require("../../models/auth/User");

class AuthRepository {
  async findByEmail(email) {
    return await User.findOne({ email }).select("+password").populate("role");
  }

  async create(data) {
    return await User.create(data);
  }

  async findById(id) {
    return await User.findById(id).select("+password").populate("role");
  }

  // NEW
  async findRoleByName(name) {
    return await Role.findOne({ name });
  }

  // NEW
  async findUserByPhone(phone) {
    return await User.findOne({ phone });
  }
}

module.exports = new AuthRepository();

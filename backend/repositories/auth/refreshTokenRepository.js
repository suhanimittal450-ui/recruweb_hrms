const RefreshToken = require("../../models/auth/RefreshToken");

class RefreshTokenRepository {
  async create(data) {
    return await RefreshToken.findOneAndUpdate({ token: data.token }, data, {
      upsert: true,
      returnDocument: "after",
    });
  }
  async findByToken(token) {
    return await RefreshToken.findOne({
      token,
      isRevoked: false,
    }).populate("user");
  }

  async revoke(token) {
    return await RefreshToken.findOneAndUpdate({ token }, { isRevoked: true });
  }

  async revokeAll(userId) {
    return await RefreshToken.updateMany({ user: userId }, { isRevoked: true });
  }
}

module.exports = new RefreshTokenRepository();

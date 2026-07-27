const users = new Map();

module.exports = {
  add(userId, socketId) {
    users.set(userId.toString(), socketId);
  },

  remove(socketId) {
    for (const [userId, id] of users.entries()) {
      if (id === socketId) {
        users.delete(userId);

        break;
      }
    }
  },

  get(userId) {
    return users.get(userId.toString());
  },

  all() {
    return [...users.keys()];
  },
};

const onlineUsers = require("./onlineUsers");

const { EVENTS } = require("./constants");

module.exports = (io, socket) => {
  socket.on(EVENTS.JOIN, () => {
    onlineUsers.add(socket.user.id, socket.id);

    socket.join(socket.user.id.toString());

    io.emit(EVENTS.ONLINE_USERS, onlineUsers.all());
  });
};

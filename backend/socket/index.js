const { Server } = require("socket.io");

const socketAuth = require("./socketAuth");

const registerEvents = require("./events");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,

      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log(`Socket Connected : ${socket.id}`);

    registerEvents(io, socket);
  });

  return io;
}

module.exports = initializeSocket;

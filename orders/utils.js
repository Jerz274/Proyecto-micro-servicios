const socketIO = require('socket.io');

module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*", // Use your frontend's origin
    },
  });

  io.on('connection', (socket) => {
    console.log('A client connected.');

    socket.on('message', (message) => {
      // Broadcast the received message to all connected clients
      io.emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected.');
    });

    return io; // Export the io instance
  });
};

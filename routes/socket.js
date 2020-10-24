module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("got a connection!");
    socket.on("disconnect", () => {
      console.log("connection lost");
    });
  });
};

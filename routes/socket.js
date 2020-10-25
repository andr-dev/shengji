module.exports = function (io, gameManager) {
  io.on("connection", (socket) => {
    console.log("got a connection!");

    socket.on("joinGame", function (room) {
      console.log("joinGame request to room [%s] from [%s]", room, socket.id);
      // if (socket.room) socket.leave(socket.room);
      // socket.room = room;
      setTimeout(function () {
        if (gameManager.socketJoinGame(room, socket.id)) {
          socket.join(room);
          console.log("joinGame request to room [%s] from [%s] success", room, socket.id);
        } else {
          console.log("joinGame request to room [%s] from [%s] fail", room, socket.id);
        }
      }, 2000); // just for the effect
      // if (gameManager.socketJoinGame(room, socket.id)) {
      //   socket.join(room);
      //   console.log("joinGame request to room [%s] from [%s] success", room, socket.id);
      // } else {
      //   console.log("joinGame request to room [%s] from [%s] fail", room, socket.id);
      // }
    });

    socket.on("disconnect", () => {
      console.log("connection lost");
    });
  });
};

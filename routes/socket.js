module.exports = function (io, gameManager) {
  io.on("connection", (socket) => {
    console.log("got a connection!");

    socket.on("joinGame", function (data, callbackFn) {
      var room = data.room;
      var name = data.name;
      console.log("joinGame request to room [%s] from [%s]", room, socket.id);
      // if (socket.room) socket.leave(socket.room);
      // socket.room = room;
      setTimeout(function () {
        var joinGame = gameManager.socketJoinGame(room, socket.id);
        if (joinGame.success) {
          io.sockets.in(room).emit("netJoin", data.name);
          socket.join(room);
          console.log("joinGame request to room [%s] from [%s] success", room, socket.id);
        } else {
          console.log("joinGame request to room [%s] from [%s] fail", room, socket.id);
        }
        callbackFn(joinGame);
      }, 2000); // just for the effect
      // if (gameManager.socketJoinGame(room, socket.id)) {
      //   socket.join(room);
      //   console.log("joinGame request to room [%s] from [%s] success", room, socket.id);
      // } else {
      //   console.log("joinGame request to room [%s] from [%s] fail", room, socket.id);
      // }
    });

    socket.on("disconnect", () => {
      console.log("disconnect socket [%s] starting", socket.id);
      gameManager.socketLeave(socket.id);
      console.log("disconnect socket [%s] complete", socket.id);
    });
  });
};

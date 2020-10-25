import { Game } from "./Game";

var gameList = new Map();
var publicGameInfo = [];
setInterval(updatePublicGameInfo, 5000);

module.exports = class GameManager {
  constructor(io) {
    console.log("initializing GameManager");
    this.io = io;
  }

  getPublicGameInfo() {
    return publicGameInfo;
  }

  createGame() {
    var game = new Game(this.io);
    gameList.set(game.getUUID(), game);
    return game.getInfo();
  }

  socketJoinGame(room, socketId) {
    var game = gameList.get(room);
    if (game == undefined) {
      console.log("joinGame request to room [%s] from [%s] error: game does not exist", game.getUUID(), socketId);
      return false;
    }
    return game.joinGame(socketId);
  }
};

function updatePublicGameInfo() {
  publicGameInfo = Array.from(gameList.values()).filter((x) => {
    if (x.gameState.state == 0 && !x.gameState.private) {
      return x;
    }
  });
}

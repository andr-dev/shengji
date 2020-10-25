import { v4 as uuidv4 } from "uuid";

export class Game {
  constructor() {
    console.log("initializing new game");

    this.gameState = {
      uuid: uuidv4(),
      state: 0, // 0 -> lobby, 1 -> in game
      private: false,
      players: [],
    };

    // this.io = require("socket.io")(process.env.PORT, {
    //   path: "/game/" + this.gameState.uuid,
    //   pingInterval: 10000,
    //   pingTimeout: 5000,
    // });

    // this.io.on("connection", () => {
    //   console.log("got a game connection on uuid %s", this.gameState.uuid);
    // });
  }

  getPublicInfo() {
    return {
      uuid: this.gameState.uuid,
      state: this.gameState.state,
      private: this.gameState.private,
    };
  }

  getUUID() {
    return this.gameState.uuid;
  }

  getGameState() {
    return this.gameState;
  }

  joinGame(socketId) {
    if (this.gameState.players.length < 4) {
      if (this.gameState.players.includes(socketId)) {
        console.log("joinGame request to room [%s] from [%s] error: already in game", this.gameState.uuid, socketId);
        return { success: false };
      }
      console.log("joinGame request to room [%s] from [%s] verified", this.gameState.uuid, socketId);
      this.gameState.players.push(socketId);
      return { success: true, gameData: this.getGameState() };
    }
    return { success: false };
  }

  playerLeave(socketId) {
    var i = this.gameState.players.indexOf(socketId);
    if (i > -1) {
      this.gameState.players.splice(i, 1);
      console.log("disconnect socket [%s] from room [%s] success", socketId, this.getUUID());
    } else {
      console.log("error: [%s] in game but not", socketId);
      console.log("disconnect socket [%s] from room [%s] failed", socketId, this.getUUID());
    }
  }
}

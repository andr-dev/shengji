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

  getInfo() {
    return {
      uuid: this.gameState.uuid,
      state: this.gameState.state,
      private: this.gameState.private,
    };
  }

  getUUID() {
    return this.gameState.uuid;
  }

  joinGame(socketId) {
    if (this.gameState.players.length < 4) {
      if (this.gameState.players.includes(socketId)) {
        console.log("joinGame request to room [%s] from [%s] error: already in game", this.gameState.uuid, socketId);
        return false;
      }
      console.log("joinGame request to room [%s] from [%s] verified", this.gameState.uuid, socketId);
      this.gameState.players.push(socketId);
      return true;
    }
    return false;
  }
}

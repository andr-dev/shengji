import React from "react";
import { withRouter } from "react-router-dom";

class MainMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      games: [],
    };

    this.updateLobby = this.updateLobby.bind(this);
    this.updateLobby();
    this.lobbyUpdateInterval = setInterval(this.updateLobby, 5000);

    this.joinGame = this.joinGame.bind(this);
  }

  render() {
    return (
      <div className="App-Window">
        <div className="LobbyViewer">
          <h2 style={{ textAlign: "center" }}>ShengJi</h2>
          <table style={{ width: "1024px" }}>
            <tr>
              <th style={{ width: "512px" }}>Lobby Name</th>
              <th style={{ width: "64px" }}>Players</th>
              <th style={{ width: "64px" }}>Private</th>
              <th style={{ width: "64px" }}>Join</th>
            </tr>
            {this.state.games.map((i) => {
              return (
                <tr>
                  <td>{i.gameState.uuid}</td>
                  <td>{i.gameState.state}</td>
                  <td>{i.gameState.private ? "true" : "false"}</td>
                  <td>
                    <button onClick={() => this.joinGame(i.gameState)}>Join</button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.lobbyUpdateInterval);
  }

  updateLobby() {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener(
      "load",
      function () {
        var data = JSON.parse(xhr.responseText);
        this.setState({ games: data });
      }.bind(this)
    );

    xhr.open("GET", "http://localhost:9091/api/games");
    xhr.send();
  }

  joinGame(gameState, name) {
    console.log("joinGame fired");
    this.props.socket.emit(
      "joinGame",
      { room: gameState.uuid, name: name },
      function (res) {
        console.log(res);
        if (res.success) {
          console.log("join game success -> redirect");
          this.props.history.push({
            pathname: "/game",
            search: "?id=" + res.gameData.uuid,
          });
        } else {
          console.log("join game failed -> stay in main menu");
        }
      }.bind(this)
    );
  }
}

export default withRouter(MainMenu);

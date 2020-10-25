import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import MainMenu from "./components/mainmenu/Lobby";

const socket = require("socket.io-client")("ws://localhost:9090", {
  reconnectionDelayMax: 10000,
});
socket.on("message", function (data) {
  console.log("Incoming message:", data);
});

function WindowManager({ location }) {
  return (
    <div className="App-Wrapper">
      <TransitionGroup className="App-Wrapper-TG">
        <CSSTransition key={location.key} timeout={{ enter: 250, exit: 250 }} classNames="fade">
          <section className="App-Wrapper-RS">
            <Switch location={location}>
              <Route exact path="/" render={() => <MainMenu socket={socket} />} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default withRouter(WindowManager);

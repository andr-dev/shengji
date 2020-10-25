const express = require("express");
const router = express.Router();

module.exports = function (gameManager) {
  router.get("/ping", (req, res, next) => {
    res.send("pong");
  });

  router.get("/time", (req, res, next) => {
    res.json({ time: new Date().getTime() });
  });

  router.get("/games", (req, res, next) => {
    var games = gameManager.getPublicGameInfo();
    res.json(games);
  });

  router.get("/createGame", (req, res, next) => {
    var gameInfo = gameManager.createGame();
    res.json(gameInfo);
  });

  router.get("/joinGame", (req, res, next) => {});

  return router;
};

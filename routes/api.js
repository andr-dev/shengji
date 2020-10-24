const express = require("express");
const router = express.Router();

router.get("/ping", (req, res, next) => {
  res.send("pong");
});

router.get("/time", (req, res, next) => {
  res.json({ time: new Date().getTime() });
});

router.get("/games", (req, res, next) => {
  res.send({ games: [] });
});

module.exports = router;

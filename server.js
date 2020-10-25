require("dotenv").config();

const path = require("path");
const app = require("express")();
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const GameManager = require("./game/GameManager");
const gameManager = new GameManager(io);

const routeApi = require("./routes/api.js")(gameManager);
require("./routes/socket.js")(io, gameManager);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send({ error: "server still in development" });
});

app.use("/api", routeApi);
// app.get("/game/:gameId/", function (req, res) {
//   var joinInfo = gameManager.joinGame(req.params);
//   res.send(req.params);
// });

//app.use(express.static(path.join(__dirname, "client\\build")));

server.listen(process.env.PORT, () => {
  console.log("server running on port %s", process.env.PORT);
});

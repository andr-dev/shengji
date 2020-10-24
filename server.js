const path = require("path");
const app = require("express")();
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const routeApi = require("./routes/api.js");
require("./routes/socket.js")(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send({ error: "server still in development" });
});

app.use("/api", routeApi);

//app.use(express.static(path.join(__dirname, "client\\build")));

server.listen(process.env.PORT || 9090, () => {
  console.log("server running on port 9090");
});

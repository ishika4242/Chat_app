const express = require("express");
const app = express();
const http = require("http").createServer(app);

const PORT = process.eventNames.PORT || 3000;

http.listen(PORT, () => {
  console.log(PORT);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const io = require("socket.io")(http);
io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

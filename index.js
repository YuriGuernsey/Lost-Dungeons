const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('moveX', (updatedXPos) => {
    io.emit('moveX', updatedXPos);
  });
  socket.on('moveY', (updatedYPos) => {
    io.emit('moveY', updatedYPos);
  });
});

server.listen(process.env.PORT || 8080, () => {
  console.log('listening on *:3000');
});
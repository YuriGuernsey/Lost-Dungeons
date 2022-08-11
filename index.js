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
  socket.on('newuser', function(nick){
    var newUser = nick;
    console.log(newUser + ' connected');
    io.emit('connection2', newUser + ' has connected.');
  socket.on('disconnect', () => {
    io.emit('disconnection', newUser + ' has left');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
});
server.listen(process.env.PORT || 8080, () => {
  console.log('listening on *:8080');
});
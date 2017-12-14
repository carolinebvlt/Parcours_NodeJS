var express = require ('express');
var app = express();
var server = require('http').createServer(app);
// var fs = require('fs');
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/assets'));
app.get('/', function(rq, rs){
  rs.render('chatBox.ejs');
});


io.sockets.on('connection', function(socket, pseudo){
  console.log('1 connexion');

  socket.on('newUser', function(pseudo){
    socket.pseudo = pseudo;
    console.log(socket.pseudo);
  });

  socket.on('msg', function(msg){
    console.log(socket.pseudo + ' : ' + msg);
    socket.broadcast.emit('msg', {exp:socket.pseudo, content:msg});
  })
});

server.listen(8080);

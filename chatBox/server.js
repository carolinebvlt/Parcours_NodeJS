var express = require ('express');
var app = express();
var server = require('http').createServer(app);
// var fs = require('fs');
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/assets'));
app.get('/', function(rq, rs){
  rs.render('chatBox.ejs');
});


io.sockets.on('connection', function(socket){
  console.log('1 connexion');
  socket.on('msg', function(msg){
    console.log(msg);
  })
});

server.listen(8080);

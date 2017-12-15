var express = require ('express');
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/db'));
app.get('/', function(rq, rs){
  rs.render('messenger.ejs');
});


io.sockets.on('connection', function(socket, pseudo){

  socket.on('newUser', function(pseudo){
    socket.pseudo = pseudo;
    socket.broadcast.emit('userON', pseudo);
    fs.readFile('db/test.json','utf8' , (err, content) => {
      if (err) throw err;
      console.log(content);
      console.log('________');
      var data = JSON.parse(content);
      console.log(data.name);
    });
  });

  socket.on('msg', function(msg){
    socket.broadcast.emit('msg', {exp:socket.pseudo, content:msg});
  })
});

server.listen(8080);

# Parcours_NodeJS

* ## server.js
  * var io = require('socket.io');
  * io.listen(server);
  * io.sockets.on( 'connection', *callback*(*__socket__*) {} );

* ## client.html
  * script 1 : src = '/socket.io/socket.io.js'
  * *script 2* : var *__socket__* = io.connect(http://localhost:8080)  


*action* | __server.js__ | __client.html__
- | - | -
server -> client | *callback* : *__socket__* . emit ( 'type' , 'content' ) | *script 2* : *__socket__* . on ( 'type' , fct ( var ) { } )
client -> server | *callback* : *__socket__* . on ( 'type' , fct ( var ) { } ) | *script 2* : *__socket__* . emit ( 'type' , 'content' )
server -> all clients | *callback* : *__socket__* . broadcast . emit ( 'type' , 'content' ) | 

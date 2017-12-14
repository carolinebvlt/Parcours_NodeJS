var socket = io.connect('http://localhost:8080');
var pseudo = prompt('What\'s your name ?');
socket.emit('newUser', pseudo);

function insertMsg(targetId, msg){
  document.getElementById(targetId).prepend(msg.exp + " : " + msg.content);
}
function insertOwnMsg(targetId, pseudo, msg){
  document.getElementById(targetId).prepend(pseudo + " : " + msg );
}

document.getElementById('submitMsg').addEventListener('click', function(event){
  event.preventDefault();
  msg = document.getElementById('message').value;
  socket.emit('msg', msg);
  // console.log(msg);
  insertOwnMsg('chatZone',pseudo, msg);
  document.getElementById('message').value = '';
});

socket.on('msg', function(msg){
  console.log(msg.exp);
  console.log(msg.content);
  insertMsg('chatZone', msg);
})

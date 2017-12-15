var socket = io.connect('http://localhost:8080');
var pseudo = prompt('What\'s your name ?');
socket.emit('newUser', pseudo);

function insertMsg(targetId, msg){
  //document.getElementById(targetId).prepend(msg.exp + " : " + msg.content);
  var parent = document.getElementById(targetId);
  var p = document.createElement('p');
  p.innerHTML = "<strong>"+msg.exp+" : </strong>" + msg.content;
  parent.append(p);
}
function insertOwnMsg(targetId, pseudo, msg){
  //document.getElementById(targetId).prepend(pseudo + " : " + msg );
  var parent = document.getElementById(targetId);
  var p = document.createElement('p');
  p.innerHTML = "<strong><i>Me</i> : </strong>" + msg;
  parent.append(p);
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

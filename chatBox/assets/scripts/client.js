var socket = io.connect('http://localhost:8080');
var pseudo = prompt('What\'s your name ?');
socket.emit('newUser', pseudo);

document.getElementById('submitMsg').addEventListener('click', function(event){
  msg = document.getElementById('message').value;
  socket.emit('msg', msg);
  event.preventDefault();
  document.getElementById('message').value = '';
});

socket.on('msg', function(msg){
  console.log(msg);
})

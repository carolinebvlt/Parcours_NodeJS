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
  console.log(msg.exp);
  console.log(msg.msg);
  //document.getElementById('chatZone').innerHTML = "<p>"+ "<strong>" +  + "</strong>" +"</p>"
})

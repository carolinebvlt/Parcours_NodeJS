var socket = io.connect('http://localhost:8080');

document.getElementById('submitMsg').addEventListener('click', function(event){
  msg = document.getElementById('message').value;
  socket.emit('msg', msg);
  event.preventDefault();
  document.getElementById('message').value = '';
});

var express = require ('express');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.use(cookieSession({secret: 'toDoPerso', maxAge: 24 * 60 * 60 * 1000}));
app.use(express.static(__dirname + '/assets'))
app.use(function(rq, rs, next){
  if (typeof(rq.session.tdl) == 'undefined') {
    rq.session.tdl = [ideas=[], toDo=[], issues=[]];
  }
  next();
});
app.get('/toDoList', function(rq, rs){
  rs.render('toDoList.ejs', {ideas:rq.session.tdl[0], toDo:rq.session.tdl[1], issues:rq.session.tdl[2]});
});
app.get('/toDoList/ideas/delete/:nbr', function(rq, rs){
  rq.session.tdl[0].splice(rq.params.nbr, 1);
  rs.redirect('/toDoList');
});
app.get('/toDoList/toDo/delete/:nbr', function(rq, rs){
  rq.session.tdl[1].splice(rq.params.nbr, 1);
  rs.redirect('/toDoList');
});
app.get('/toDoList/issues/delete/:nbr', function(rq, rs){
  rq.session.tdl[2].splice(rq.params.nbr, 1);
  rs.redirect('/toDoList');
});
app.get('/toDoList/ideas/prior/:nbr', function(rq, rs){
  var ideas = rq.session.tdl[0];
  ideas.unshift(ideas[rq.params.nbr]);
  ideas.splice(Number(rq.params.nbr)+1, 1);
  rs.redirect('/toDoList');
});
app.get('/toDoList/toDo/prior/:nbr', function(rq, rs){
  var toDo = rq.session.tdl[1];
  toDo.unshift(toDo[rq.params.nbr]);
  toDo.splice(Number(rq.params.nbr)+1, 1);
  rs.redirect('/toDoList');
});
app.get('/toDoList/issues/prior/:nbr', function(rq, rs){
  var issues = rq.session.tdl[2];
  issues.unshift(issues[rq.params.nbr]);
  issues.splice(Number(rq.params.nbr)+1, 1);
  rs.redirect('/toDoList');
});

app.post('/toDoList/ideas/add', urlencodedParser, function(rq, rs){
  rq.session.tdl[0].push(rq.body.newIdeasItem);
  rs.redirect('/toDoList');
});
app.post('/toDoList/toDo/add', urlencodedParser, function(rq, rs){
  rq.session.tdl[1].push(rq.body.newToDoItem);
  rs.redirect('/toDoList');
});
app.post('/toDoList/issues/add', urlencodedParser, function(rq, rs){
  rq.session.tdl[2].push(rq.body.newIssuesItem);
  rs.redirect('/toDoList');
});

app.listen(7777);

var express = require('express');
var session = require('cookie-session'); // Load session middleware
var bodyParser = require('body-parser'); // Load the parameter management middleware
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

/* uses sessions  */
app.use(session({secret: 'todosecret'}))

/* empty array */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* display the todolist and the form */
.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: req.session.todolist});
})

/* Add an element to the todolist */
.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Delete an element from the todolist */
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* Redirection, if the requested page is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);
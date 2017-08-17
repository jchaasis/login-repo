//1. make a web server for our login site
//2.create routes
//3. create form page
//


const express = require('express');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');
const session = require('express-session');

//establish server
const server = express();

//configure server for express

    // mustache-express
server.engine('mustache', mustache());
server.set("views", "./views");
server.set("view engine", 'mustache');

    //body-parser
server.use(bodyparser.urlencoded({ extended: false }));

    //session
server.use(session({
      secret: '98rncailevn-_DT83FZ@', // TODO: LUKE DONT FORGET
      resave: false,
      saveUninitialized: true
  }));


//store user data
const users = [
    {username: 'bob', password: '123'},
    {username: 'jill', password: 'abc'},
    {username: 'it', password: 'xxx'},
  ];

//establish routes

  //get
server.get('/', function(req, res){
  res.render('login');
});

server.get('/home', function(req, res){
  res.render('home');
});

  //post
server.post('/login', function(req,res){
    res.render('home');
});



// run the server
server.listen(5000, function(){
  console.log('App booted up successfully');
})

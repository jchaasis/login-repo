//1. make a web server for our login site
//2.create routes
//3. create form page
//


const express = require('express');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');
const session = require('express-session');

//store user data
const users = [
    {username: 'bob', password: '123', pokes: 0},
    {username: 'jill', password: 'abc', pokes: 0},
    {username: 'it', password: 'xxx', pokes: 0},
  ];


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


//establish routes

  //get
server.get('/', function(req, res){
    res.render('login');
});

//if the user's session has been authenticated,
//send back the home page and populate the designated fields in mustache
server.get('/home', function(req, res){
  if (req.session.who !== undefined) {
         res.render('home', {
             username: req.session.who.username,
             pokes: req.session.who.pokes,
         });
       } else {
      res.redirect('/');
  }
});

    //signup page
server.get('/signup', function(req, res){
    res.render('signup');
})

  //post
server.post('/login', function(req,res){
    //check the username and password that are provided.
    //If the pair exists in the system(users array),
    //assign the object to the variable 'user'

    const username = req.body.username;
    const password = req.body.password;

    let user = null;

    for (let i = 0; i < users.length; i++){
        if (username === users[i].username &&
           password === users[i].password){
              user = users[i];
            }
    }
      //if the user value is not null, assign the user's details to the session
      //and redirect to the home page
        if (user !== null){
          req.session.who = user;
          res.redirect('/home');

        } else {
            res.redirect('/');
        }
});

    //count the number of pokes for a user
server.post('/poke', function(req, res){
      req.session.who.pokes++;

      res.redirect('/home');
});

    //Log out the user if they wish to log out
server.post('/logout', function(req, res){

  req.session.destroy();
  res.redirect('/');
});

    //Send the new user to the sign-up page
server.post('/signup', function(req, res){
  res.redirect('/signup');
});

    //Verify the info the new user submitted and if
    //it is a valid username and password, push to
    //the users database
server.post('/create', function(req, res){
  //loop through the current users array to compare with new submissions.
  const newName = req.body.newUsername;
  const newPassword = req.body.newPassword;
  let newUser = null;

  for (let n = 0; n < users.length; n++){
      if (newName !== users[n].username &&
          newName.length > 0 &&
          newPassword.length > 2){

              newUser = {username: newName,
                        password: newPassword,
                        pokes: 0};

              res.send(`Thank you for joining! Please return to the homepage and login!`)
        } else {
          res.send(`Invalid submission, please go back and try again.`);
        }
  }
  users.push(newUser);

  //now that the new user has been added, push them to the home page.
//   if (newser !== null){
//     req.session.who = user;
//     res.redirect('/home');
//
//
res.redirect('/home');
console.log(users);

});

// run the server
server.listen(5000, function(){
  console.log('App booted up successfully');
});

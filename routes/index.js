/*
* Project: Lucky Lows
* Module: Router
* Target: Main page (/index : Not logged user)
* Comment: 
-----------------------------------------------*/
var router = require('express').Router();
var passport = require('passport');
var indexCtrl = require('../controllers/index');
//
router.get('/', indexCtrl.index );


// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/dashboard', // where do you want the client to go after you login 
    //TODO: check this
    failureRedirect : '/' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



module.exports = router;
/*
* Project: Lucky Lows
* Module: Passport configs
* Target: Oauth process
* Comment: DB updating for logging in users happens here
-----------------------------------------------*/
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const User = require("../models/user");
// configuring Passport!
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  (accessToken, refreshToken, profile, cb) => 
  {
    // a user has logged in via OAuth!
  //console.log(profile,"<==RETURN TO PASSPORT.JS");
  User.findOne({googleId: profile.id}, (err, user) =>
    {
      if(err) 
        return cb(err);
      if(user)
        updateUser( user, cb );
      else
        saveNewUser( profile, cb );

    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
 
    User.findById(id, function(err, user) {
      return done(err, user);
    });
});

/**********************************
* Known user logged in
* set lastJoin to now, isNewbe to false,
**********************************/
function updateUser ( user, cb )
{
  user.lastJoin = new Date();
  user.isNewbe = false;
  user.save( (err) => 
  {
    if (err) return cb(err);
    return cb(null, user);
  }); 

}

/***********************************
* New user logged in
* initialize and save user data
************************************/
function saveNewUser(profile,cb)
{
  let now = new Date();
  const newUser = new User({
    name: profile.displayName,
    email: profile.emails[0].value,
    googleId: profile.id,
    avatar: profile.photos[0].value,
    coins: 1000,
    role: "free",
    joinDate: now,
    lastJoin: now,
    nickname: "",
    isNewbe: true,
  });
 newUser.save( (err) => 
 {
   if (err) return cb(err);
   return cb(null, newUser);
 }); 
}

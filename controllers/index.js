/*
* Project: Lucky Lows
* Module: Controller 
* Target: Main page (/index : Not logged user)
* Comment: This module also contains main timing engine
-----------------------------------------------*/
const Sys = require('../models/system');
const Round = require('../models/round');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const util = require('../controllers/utilities');
module.exports = {
  index,
  timingProcess,
};

/*******************************
* Showing main page for 3 kinds of users
* 1- No logged  2- New commer  3- Known usr
 *******************************/
function index(req, res)
{ // rounds will be passed to stickers.ejs

    // first of all find four VIP rounds to show on top
   Sys.find({}).populate("VIPRounds").exec( (err, sys)=> 
   {
      let vips = sys[0].VIPRounds;
      let timerStrings = [];
      vips.forEach(vip => {
        timerStrings.push( util.getCDT(vip.CDT));
      });

    if( !req.user ) // if there is no logged in user, show index page
     res.render("index", {VIPRounds: vips, timerStrings});
    else // user is logged in
    {
      let welcome = "";
      let userName = req.user.name.split(' ')[0];
      let avatarUrl = req.user.avatar;
      if(req.user.isNewbe) // prepare to show welcome screen
      {
          req.user.isNewbe = false; // this is not a new user anymore
          req.user.save( err => {
              if(err)
                  res.redirect('/errorDB');
              welcome += "Good luck and have fun " + userName + '.';
              res.render("welcome", {welcome}); 
            });
      }
      else // logged in user in known
      {
        console.log("-----------GO DASHBOARD FROM INDEX CTRL-------------");
          welcome = "Welcome back " + userName + '.';
          res.render("dashboard", 
                      {welcome, avatarUrl, VIPRounds: vips, timerStrings});
      }     
    } 
  }); // end of cb 
 }

/*******************************
* Main process engin, will be called every minutes
* Duty: 1- find all active rooms, check and update their due
*       2- find Rounds that have been marked to be deactive
*       3- control and update counter of each Round, and re-run active ones
*       4- calculate winners and losers and set the rewards
 *******************************/
function timingProcess()
{
  console.log(".");
}


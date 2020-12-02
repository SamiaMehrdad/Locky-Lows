/*
* Project: Lucky Lows
* Module: Controller 
* Target: /myrounds
* Comment: functions for process the rounds that user is engaged in.
-----------------------------------------------*/
const User = require('../models/user');
const Round = require('../models/round');
const util = require('./utilities');

module.exports = {
  index,
  enter,
  engage,
};

/*******************************
* showing list of all engaged rounds
*
 *******************************/
function index( req, res )
{
  let coins = 0;
  let starts = [];
  let CDTs = [];
  let myRounds = [];
  User.findById(req.user.id, (err, user) =>
  {
    coins = user.coins;
// finding all rounds that are active and my user appears in 
// Touchers of one of its Subjects

    Round.find({}, (err, rounds) =>
    {
      if(!err)
      {
        for(const round of rounds)
          for(const subject of round.subjects )
            for(const toucher of subject.touchers) // here I have my touchers to check
              if( toucher.toString() === user._id.toString() )
              { 
                myRounds.push(round);
                starts.push(util.shortDate(round.start));
                CDTs.push( util.getCDT( round.CDT ));
              }
        res.render('../views/myrounds', { balance: coins,myRounds, starts, CDTs  });
      }
     });
  });
}

/*******************************
* rendering specific room
*
 *******************************/
function enter( req, res )
{
    let roomId = req.params.id;
    //user is not defined if no user is logged in
    // find round by id
    Round.findById(roomId, (err,room) => 
    {
      // and show the room for founded round
      if(!err)
      {
        res.render('../views/room', {user:req.user, room});
      }
    });
}

/*******************************
* saving engaged round
*
 *******************************/
function engage( req, res )
{
  // req.body.user is a String, so needs to extrct id
let uId = req.body.user.split(',')[0].split(' ')[3];

 Round.findById(req.body.round, (err, round)=>
  {
    for(const subject of round.subjects )
              if( subject._id.toString() === req.body.sId.toString() )
              { 
                console.log("ENGAGING--> ",req.body.sId, " Of---->", round._id);
                subject.touchers.push(uId);
                round.save( () =>res.redirect("/myrounds") );
              }
    
   });
}

/*******************************
* helping function to get user's LLcoins amount
*
 *******************************/
 function getCoins( userId ) {
     User.findById(userId, function(err, user)
    {
        if(err)
            console.log("ERROR IN GETTING COINS FOR ", userId, err);
        return (user.coins);
    });
 }
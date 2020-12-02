/*
* Project: Lucky Lows
* Module: Controller 
* Target: mystudio
* Comment:
-----------------------------------------------*/
const User = require('../models/user');
const Round = require('../models/round');
const util = require('./utilities');

module.exports = {
  index,
  new: newRound,
  make,
  create,
};

/*******************************
*  showing list of all owned rounds
*
 *******************************/
function index( req, res, next )
{
    let coins = 0;
    let starts = [];
    let CDTs = [];

    if(!req.user)
        return res.redirect("/");

    User.findById(req.user.id, (err, user) => {
        coins = user.coins;
    

    Round.find({ owner: req.user.id }, function(err, rounds)
    {
     if(!err)
     {
        rounds.forEach(round => { 
          starts.push( util.shortDate(round.createdAt)); 
          CDTs.push( util.getCDT(round.CDT));
          })
       // console.log("Round index coins --->", coins );
        res.render('../views/mystudio', { balance: coins , rounds, starts, CDTs  });
     }
    });
    });
}

/*******************************
* showing new round making settings
*
 *******************************/
function newRound( req, res, next )
{ 
  res.render("../views/newround");
}

/*******************************
* showing studio main page
*
 *******************************/
function make( req, res )
{
    let subjects = req.body;
   // console.log('studio -subjects---->', subjects);
    res.render("../views/studio",{subjects});
}

/*******************************
* comming back from studio and saving new born round
*
 *******************************/
function create(req, res, next)
{
    if( req.user )
    {
        const newRound = new Round({
            owner: req.user.id,
            title: req.body.title,
            fee: parseInt(req.body.fee),
            start: new Date(),
            CDT: parseInt(req.body.due) * 24*3600000,
            due: parseInt(req.body.due),
            counter: parseInt(req.body.counter),
            desc: req.body.desc,
            isActive: true,
            subjects: req.body.subjects
        });

        newRound.save( err => {
            if(err)
                console.log("Error on database -->", err);
        });
    }
    console.log("REDIRECTING FROM mystudioCtrl.create.");
    res.render("../views/mystudio",{balance: 1000});
}
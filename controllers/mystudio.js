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
*
*  let coins = 0;
  let starts = [];
  let CDTs = [];
  User.findById(req.user.id, (err, user) =>
    {
        coins = user.coins;
    });

  Round.find({ owner: req.user.id }, function(err, rounds)
  {
     if(!err)
     {
        rounds.forEach(round => { 
          starts.push( util.shortDate(round.start)); 
          CDTs.push( util.getCDT(round.CDT));
          })
       // console.log("Round index coins --->", coins );
        res.render('../views/myrounds', { balance: coins , rounds, starts, CDTs  });
     }
  });
 *******************************/
function index( req, res, next )
{
    let coins = 0;
    let starts = [];
    let CDTs = [];    
    if(!req.user)
        return res.redirect("/");
    User.findById(req.user.id, (err, user) =>
    {
        coins = user.coins;
    });
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


 //console.log("----------------------------", req.user,"<-----REACH my rounds ");
// res.render("../views/mystudio", {balance: 1000});   
}

/*******************************
*
*
 *******************************/
function newRound( req, res, next )
{ 
  res.render("../views/newround");
}

/*******************************
*
*
 *******************************/
function make( req, res )
{
    let subjects = req.body;
    console.log('studio -subjects---->', subjects);
    res.render("../views/studio",{subjects});
}

/*******************************
*
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
            due: parseInt(req.body.due),
            counter: parseInt(req.body.counter),
            desc: req.body.desc,
            isActive: true,
            subjects: req.body.subjects
        });

        newRound.save( err => {
            if(err)
                console.log("Error on database -->", err);
        })
    }
    console.log(req.body, "<----CREATE");
    console.log("user --->",req.user);
    console.log("REDIRECTING FROM mystudioCtrl.create.");
    res.render("../views/mystudio",{balance: 1000});
}
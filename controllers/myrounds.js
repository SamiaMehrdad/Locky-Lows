const User = require('../models/user');
const Round = require('../models/round');
const util = require('./utilities');

module.exports = {
  index,
  enter,
  engage,
};

/*******************************
*
*
 *******************************/
function index( req, res )
{
  let coins = 0;
  let starts = [];
  let CDTs = [];
  User.findById(req.user.id, (err, user) =>
    {
        coins = user.coins;
    });
//TODO: IMPORTANT here you should find all rounds that are active 
//TODO: IMPORTANT   and user id appears in touchers of one of its subjects
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

}

/*******************************
*
*
 *******************************/
function enter( req, res )
{
  console.clear();
    console.log(req.params);
    console.log(req.body);
    res.send("YOU ENTERED THE ROOM ");
}

/*******************************
*
*
 *******************************/
function engage( req, res )
{
    
}

/*******************************
*
*
 *******************************/
 function getCoins( userId ) {
     User.findById(userId, function(err, user)
    {
        if(err)
            console.log("ERROR IN GETTING COINS FOR ", userId, err);
        console.log("GETTING COINS", user.coins, " OF ", typeof(user.coins));    
        return (user.coins);
    });
 }
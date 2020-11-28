const User = require('../models/user');
const Round = require('../models/round');

module.exports = {
  index,
  new: newRound,
  make,
  create,
//  addFact,
//  delFact
};

function index( req, res, next )
{
if(!req.user)
{
    res.redirect("/");
    return;
}
 //console.log("----------------------------", req.user,"<-----REACH my rounds ");
 res.render("../views/myrounds");   
}

function newRound( req, res, next )
{
    res.render("../views/newround");
}

function make( req, res )
{
    let subjects = req.body;

    console.log('studio -subjects---->', subjects);
    res.render("../views/studio",{subjects});
}

function create(req, res, next)
{
    console.log(req.body, "<----CREATE");
    console.log(req.user);
    res.redirect("/myrounds");
}
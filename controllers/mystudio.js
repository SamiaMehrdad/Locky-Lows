const User = require('../models/user');
const Round = require('../models/round');

module.exports = {
  index,
  new: newRound,
  make,
  create,
};

/*******************************
*
*
 *******************************/
function index( req, res, next )
{
if(!req.user)
{
    res.redirect("/");
    return;
}
 //console.log("----------------------------", req.user,"<-----REACH my rounds ");
 res.render("../views/mystudio", {balance: 1000});   
}

/*******************************
*
*
 *******************************/
function newRound( req, res, next )
{ 
//    if(req.isAuthenticated())
        res.render("../views/newround");
    // else
    //     res.redirect('/auth/google');
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
            fee: req.body.fee,
            start: new Date(),
            counter: req.body.counter,
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
    res.render("../views/mystudio");
}
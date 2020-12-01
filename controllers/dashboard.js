
const Sys = require('../models/system');
const util = require('../controllers/utilities');

module.exports = {
  index,
  showRound,
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
    let welcome = "";
    let userName = req.user.name.split(' ')[0];
    let avatarUrl = req.user.avatar;

    if(req.user.isNewbe)
    {
        req.user.isNewbe = false; // this is not a new user anymore
        req.user.save( err => {
            if(err)
                 res.redirect('/errorDB');
            welcome += "Good luck and have fun " + userName + '.';
            res.render("welcome", {welcome}); 
          });
    }
    else
    {
        welcome = "Welcome back " + userName + '.';
        Sys.find({}).populate("VIPRounds").exec( (err, sys)=> {
          let vips = sys[0].VIPRounds;
          let timerStrings = [];
          vips.forEach(vip => {
            timerStrings.push( util.getCDT(vip.CDT));
          });
          res.render("dashboard", {welcome, avatarUrl, VIPRounds: sys[0].VIPRounds,timerStrings});
        });     
       // res.render("dashboard", {welcome, avatarUrl, id:"xxx",  VIPRounds});
    }

}

/*******************************
*
*
 *******************************/
function showRound( req, res, next )
{
   res.send( "R OOOOOOOOOOOOOO M");
}

